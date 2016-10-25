'use strict';

import path from 'path';
import assert from 'yeoman-assert';
import test from 'yeoman-test';

describe('app', () => {
    before(done => {
        test
            .run(path.join(__dirname, '../../src/app'))
            .withPrompts({license: 'MIT'})
            .on('end', done);
    });

    it('Should create files', () => {
        assert.file([
            'src/index.js',
            'test/unit/index.test.js',
            'test/mocha.opts',
            '.babelrc',
            '.editorconfig',
            '.gitignore',
            '.npmignore',
            'package.json',
            'README.md',
            '.travis.yml',
            'LICENSE'
        ]);
    });
});
