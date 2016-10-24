'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _yeomanGenerator = require('yeoman-generator');

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QUESTIONS = [{
    type: 'input',
    name: 'module:name',
    message: 'Module name'
}, {
    type: 'input',
    name: 'module:description',
    message: 'Module description'
}, {
    type: 'input',
    name: 'module:author:nickname',
    message: 'Your GitHub username'
}, {
    type: 'input',
    name: 'module:author:fullName',
    message: 'Your full name'
}, {
    'type': 'list',
    'name': 'module:license',
    'message': 'Choose a license',
    'default': 'MIT',
    'choices': ['Apache-2.0', 'Artistic-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'EPL-1.0', 'GPL-2.0', 'GPL-3.0', 'ISC', 'LGPL-2.1', 'LGPL-3.0', 'MIT', 'MPL-2.0', 'Unlicense']
}];

var LICENSE_TEMPLATE_URL = 'https://raw.githubusercontent.com/github/choosealicense.com/gh-pages/_licenses/';

/**
 * Fetch license text from choosealicense.com
 *
 * @param {string} license License ID
 * @param {Function} cb Callback function with license content as argument
 */
function fetchLicense(license, cb) {
    var licenseURL = '' + LICENSE_TEMPLATE_URL + license.toLowerCase() + '.txt';
    _https2.default.get(licenseURL, function (res) {
        var tpl = '';
        res.on('data', function (chunk) {
            return tpl += chunk;
        });
        res.on('end', function () {
            return cb(tpl);
        });
    });
}

module.exports = function (_Base) {
    _inherits(AppGenerator, _Base);

    function AppGenerator() {
        _classCallCheck(this, AppGenerator);

        return _possibleConstructorReturn(this, (AppGenerator.__proto__ || Object.getPrototypeOf(AppGenerator)).apply(this, arguments));
    }

    _createClass(AppGenerator, [{
        key: 'prompting',
        value: function prompting() {
            var _this2 = this;

            var done = this.async();

            this.log((0, _yosay2.default)('Welcome to the extraordinary es2017 npm module generator!'));
            this.prompt(QUESTIONS).then(function (answers) {
                _this2.answers = answers;
                done();
            });
        }
    }, {
        key: 'writing',
        value: function writing() {
            var _this3 = this;

            this.directory('src', 'src');
            this.directory('test', 'test');
            this.copy('babelrc', '.babelrc');
            this.copy('editorconfig', '.editorconfig');
            this.copy('gitignore', '.gitignore');
            this.copy('npmignore', '.npmignore');
            this.copy('package.json', 'package.json');
            this.copy('README.md', 'README.md');
            this.copy('travis.yml', '.travis.yml');

            var done = this.async();
            fetchLicense.call(this, this.answers['module:license'], function (tpl) {
                var content = tpl.replace(/-+[\d\D]*?-+\n\n/, '').replace(/\[year\]/g, new Date().getFullYear()).replace(/\[fullname\]/g, _this3.answers['module:author:fullName']);
                _this3.write('LICENSE', content);
                done();
            });
        }
    }, {
        key: 'install',
        value: function install() {
            this.npmInstall();
        }
    }, {
        key: 'end',
        value: function end() {
            this.log('Runing git init');
            this.spawnCommandSync('git', ['init', '--quiet']);
        }
    }]);

    return AppGenerator;
}(_yeomanGenerator.Base);
