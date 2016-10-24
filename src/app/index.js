'use strict';

import https from 'https';
import {Base} from 'yeoman-generator';
import yosay from 'yosay';

const QUESTIONS = [
    {
        type: 'input',
        name: 'module:name',
        message: 'Module name'
    },
    {
        type: 'input',
        name: 'module:description',
        message: 'Module description'
    },
    {
        type: 'input',
        name: 'module:author:nickname',
        message: 'Your GitHub username'
    },
    {
        type: 'input',
        name: 'module:author:fullName',
        message: 'Your full name'
    },
    {
        'type': 'list',
        'name': 'module:license',
        'message': 'Choose a license',
        'default': 'MIT',
        'choices': [
            'Apache-2.0',
            'Artistic-2.0',
            'BSD-2-Clause',
            'BSD-3-Clause',
            'EPL-1.0',
            'GPL-2.0',
            'GPL-3.0',
            'ISC',
            'LGPL-2.1',
            'LGPL-3.0',
            'MIT',
            'MPL-2.0',
            'Unlicense'
        ]
    }
];

const LICENSE_TEMPLATE_URL = 'https://raw.githubusercontent.com/github/choosealicense.com/gh-pages/_licenses/';

/**
 * Fetch license text from choosealicense.com
 *
 * @param {string} license License ID
 * @param {Function} cb Callback function with license content as argument
 */
function fetchLicense(license, cb) {
    let licenseURL = `${LICENSE_TEMPLATE_URL}${license.toLowerCase()}.txt`;
    https.get(
        licenseURL,
        res => {
            let tpl = '';
            res.on('data', chunk => tpl += chunk);
            res.on('end', () => cb(tpl));
        }
    );
}

module.exports = class AppGenerator extends Base {
    prompting() {
        let done = this.async();

        this.log(yosay('Welcome to the extraordinary es2017 npm module generator!'));
        this
            .prompt(QUESTIONS)
            .then(answers => {
                this.answers = answers;
                done();
            });
    }

    writing() {
        this.directory('src', 'src');
        this.directory('test', 'test');
        this.copy('babelrc', '.babelrc');
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('npmignore', '.npmignore');
        this.copy('package.json', 'package.json');
        this.copy('README.md', 'README.md');
        this.copy('travis.yml', '.travis.yml');

        let done = this.async();
        this::fetchLicense(
            this.answers['module:license'],
            tpl => {
                let content = tpl
                    .replace(/-+[\d\D]*?-+\n\n/, '')
                    .replace(/\[year\]/g, new Date().getFullYear())
                    .replace(/\[fullname\]/g, this.answers['module:author:fullName']);
                this.write('LICENSE', content);
                done();
            }
        );
    }

    install() {
        this.npmInstall();
    }

    end() {
        this.log('Runing git init');
        this.spawnCommandSync('git', ['init', '--quiet']);
    }
};
