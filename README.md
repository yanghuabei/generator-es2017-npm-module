# generator-es2017-npm-module

![Build Status](https://img.shields.io/travis/yanghuabei/generator-es2017-npm-module.svg)
![Coverage](https://img.shields.io/coveralls/yanghuabei/generator-es2017-npm-module.svg)

![Downloads](https://img.shields.io/npm/dm/generator-es2017-npm-module.svg)
![Downloads](https://img.shields.io/npm/dt/generator-es2017-npm-module.svg)
![npm version](https://img.shields.io/npm/v/generator-es2017-npm-module.svg)
![License](https://img.shields.io/npm/l/generator-es2017-npm-module.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependencies](https://img.shields.io/david/yanghuabei/generator-es2017-npm-module.svg)
![dev dependencies](https://img.shields.io/david/dev/yanghuabei/generator-es2017-npm-module.svg)

**Forked from [Eugene Obrezkov](https://github.com/ghaiklor/generator-es6-npm-module).**

This generator creates empty npm module with es2017 support and integrated Travis and Coveralls services.

## Getting Started

```bash
npm install -g yo generator-es2017-npm-module
mkdir my-project && cd my-project
yo es2017-npm-module
```

Or you can create folder with your project and just copy\paste this code to terminal (you should be located under your project folder)

```bash
npm install -g yo generator-es2017-npm-module && yo es2017-npm-module
```

## Project structure

When project is generated you will get project with that structure:

```
|-- my-project
  |-- src
  |  |-- index.js
  |-- test
  |  |-- unit
  |  |  |-- index.test.js
  |  |-- mocha.opts
  |-- .babelrc
  |-- .editorconfig
  |-- .gitignore
  |-- .npmignore
  |-- .travis.yml
  |-- package.json
  |-- LICENSE
  |-- README.md
```

## Notes

### How to use coveralls service with travis ci?

Activate coveralls service for your repository on https://coveralls.io. Then add following code to `.travis.yml`.

```
script:
  - npm test
after_success:
  - npm run coveralls
```

I tried to run `npm run coveralls` locally, and got `422` error. It might be a bug of coveralls. So if you want light on coverage icon, use coveralls service with travis ci.

If you do not want to use coveralls service, just delete coveralls relevant script and devDependencies in `package.json`.

## License

The MIT License (MIT)

Copyright © 2016 YangHuabei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
