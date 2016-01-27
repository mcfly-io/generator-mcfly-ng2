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
var body = testHelper.mixins.readTextFile('./client/index-dashboard.html');
console.log(body);
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

### registerTransformStream
We can use tap instead of a gulp plugin
```js
this.registerTransformStream([
        extensionFilter,
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_css(contents, config);
            file.contents = new Buffer(contents);
        }),
        extensionFilter.restore
 ]);
```
