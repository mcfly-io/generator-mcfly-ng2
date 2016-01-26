[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# generator-mcfly-ng2

[![Join the chat at https://gitter.im/mcfly-io/generator-mcfly-ng2](https://badges.gitter.im/mcfly-io/generator-mcfly-ng2.svg)](https://gitter.im/mcfly-io/generator-mcfly-ng2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mcfly-ng2 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mcfly-ng2
```

Then generate your new project:

```bash
yo mcfly-ng2
```

## Testing
```sh
npm run test # lint + unit tests
npm run mocha # to run without linting first
npm run mocha.watch # to run in watch mode
```

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT

## Yeoman notes
### Create directory
```js
var mixinFile = require('../../libs/mixinFile');
var utils = {};
mixinFile.extend(utils);
var body = utils.mixins.mkdirp.sync(this.destinationPath('path_to_create'));
```

### Write file from string
```js
this.fs.write(this.destinationPath('xxx'), content);
```

### Read scaffolded file in test
```js
var mixinFile = require('../../libs/mixinFile');
var utils = {};
mixinFile.extend(utils);
var body = utils.mixins.readTextFile('./package.json');
```

or we can use the testHelper
```js
var testHelper = require('./testHelper');
var body = testHelper.mixins.readTextFile('./.yo-rc.json');
```

### Test regex on file content
```js
 var expectedContents = [
  ['package.json', /"name": "name_x"/],
  ['tsconfig.json', new RegExp('\"' + clientFolder + /\/\*\*\/\*\.ts/.source)]
];
 assert.fileContent(expectedContents);        
```

### Test object on JSON file content
```js
assert.JSONFileContent('package.json', {
  name: 'name-x'
});
```

[npm-image]: https://badge.fury.io/js/generator-mcfly-ng2.svg
[npm-url]: https://npmjs.org/package/generator-mcfly-ng2
[travis-image]: https://travis-ci.org/mcfly-io/generator-mcfly-ng2.svg?branch=master
[travis-url]: https://travis-ci.org/mcfly-io/generator-mcfly-ng2
[daviddm-image]: https://david-dm.org/mcfly-io/generator-mcfly-ng2.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mcfly-io/generator-mcfly-ng2
[coveralls-image]: https://coveralls.io/repos/mcfly-io/generator-mcfly-ng2/badge.svg
[coveralls-url]: https://coveralls.io/r/mcfly-io/generator-mcfly-ng2
