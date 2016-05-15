[![Join the chat][gitter-image]][gitter-url]    

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url]   
[![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]    
[![Dependency Status][daviddm-image]][daviddm-url] [![Dependency Dev Status][daviddm-dev-image]][daviddm-dev-url]    

[![NPM][npm-nodei-image]][npm-nodei-url]

# generator-mcfly-ng2
A [Yeoman](http://yeoman.io) generator for scaffolding an app using angular2 and webpack

# Credits
This generator was inspired by this amazing repo: https://github.com/AngularClass/angular2-webpack-starter

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mcfly-ng2 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mcfly-ng2
```

Then generate your new project:

```bash
yo mcfly-ng2 [project-name]
```

You then have access to the following sub generators:
* **yo mcfly-ng2:target** (Creates a new target - you can think of it as another application)
* **yo mcfly-ng2:service** (Creates a service)
* **yo mcfly-ng2:pipe** (Creates a pipe)
* **yo mcfly-ng2:component** (Creates a component)
* **yo mcfly-ng2:directive** (Creates a directive)
* **yo mcfly-ng2:interface** (Creates an interface)

> *NOTE:*    
> When scaffolding a new target, the generator will ask you to choose between `web`, `fuse`, or `ionic2`.    
> `web` is a normal web project    
> `fuse` is a fusetools mobile app    
> `ionic2` is an Ionic 2 mobile app (cordova)    

You have access to the following npm scripts:

***Clean & Build***
* **npm run clean** (clean the `dist` folder)
* **npm run build** (build the code to the `dist` folder)
* **npm run browsersync** (open a live browser on port 5000, recompiling the code on each change)
* **npm run webpack:server** (same as browsersync but uses webpack-dev-server)

***Test***
* **npm run lint** (run eslint and tslint)
* **npm run karma** (run unit test)
* **npm run karma:watch** (run unit test in watch mode)
* **npm run e2e** (run e2e test - make sure that browsersync or webpack:server is running in another console window) 
* **npm run e2e:live** (run e2e test and stop to allow debug - make sure that browsersync or webpack:server is running in another console window) 

***Docs***
* **npm run docs** (run typedoc using the `typedoc.json` config file)

>*NB: All fuse & ionic npm commands accept an optional `OPTIONS=(...)` variable to pass additional options to those clis. `OPTIONS` can either be a single plugin name or a space-separated bash/zsh list, i.e. enclosed in parens, `(...)`, or in quotation marks `"..."`*

***Fuse Commands***
* **npm run fuse:clean** (run `uno clean` to clean up generated resources in your fuse target)
* **npm run fuse:build\[:*platform*\]** (build and run your ionic target on a device)
    - This command takes an optional platform (`ios` or `android`), if omitted the command will do both of the alternatives in this order.
* **npm run fuse:preview\[:*platform*\]** (build and run your ionic target on a device)
    - This command takes an optional platform (`ios` or `android`), if omitted the command will do both of the alternatives in this order.

***Ionic Commands***
* **npm run ionic:platform\[:*operation*\]\[:*platform*\]** (remove or add platforms to your ionic target)
    - This command takes an optional operation (`rm` or `add`) and platform (`ios` or `android`), if either is omitted the command will do both of the alternatives in this order.
* **PLUGIN=(ionic-plugin1[ ionic-plugin2]) npm run ionic:plugin\[:*operation*\]** (remove or add plugins to your ionic target)
    - This command takes an optional operation (`rm` or `add`), if it is omitted the command will attempt to remove and then add the plugin.
    - This command is often run without the operation parameter.
    - `PLUGIN` can either be a single plugin name or a space-separated bash/zsh list, i.e. enclosed in parens, `(...)`, or in quotation marks `"..."`
* **npm run ionic:run\[:*platform*\]** (build and run your ionic target on a device)
    - This command takes an optional platform (`ios` or `android`), if omitted the command will do both of the alternatives in this order.
* **npm run ionic:serve** (run an ionic2 app in the browser)
* **npm run ionic:serve:lab** (run an ionic2 app in the browser in lab mode)
* **npm run ionic:emulate** (run an ionic2 app in the emulator)

>*NB: Normally, the webpack ChangeMode plugin (`plugins/ChangeModePlugin.js`) should make sure that the ionic hooks in the dist folder are executable, if *

## Distribution
Note that the code is distributed to the `dist` folder    
You can pass a different TARGET or MODE using the following command:

```sh
[TARGET=newtarget MODE=dev] npm run build
```

Default TARGET is `app`, possible values will depends if you have scaffolded other targets    
Default MODE is `dev`, can be either `prod` or `dev`    

The same apply to the `webpack:server` task or `browsersync` task    
`npm run webpack:server`:  compile and open a the webpack reload browser    
You can pass a different TARGET or MODE using the following command:    
```sh
[TARGET=newtarget MODE=dev] npm run webpack:server
```

## Launching
```sh
npm run webpack:server
# or
npm run browsersync
```
Visit your browser at `http://localhost:5000`

## Testing
```sh
npm run test # lint + unit tests
npm run mocha # to run without linting first
npm run mocha.watch # to run in watch mode
```

## License

MIT



[npm-image]: https://badge.fury.io/js/generator-mcfly-ng2.svg
[npm-url]: https://npmjs.org/package/generator-mcfly-ng2
[npm-nodei-image]: https://nodei.co/npm/generator-mcfly-ng2.png?downloads=false&downloadRank=false&stars=false
[npm-nodei-url]: https://nodei.co/npm/generator-mcfly-ng2
[downloads-image]: http://img.shields.io/npm/dm/generator-mcfly-ng2.svg
[downloads-url]: http://badge.fury.io/js/generator-mcfly-ng2
[travis-image]: https://travis-ci.org/mcfly-io/generator-mcfly-ng2.svg?branch=master
[travis-url]: https://travis-ci.org/mcfly-io/generator-mcfly-ng2
[daviddm-image]: https://david-dm.org/mcfly-io/generator-mcfly-ng2.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mcfly-io/generator-mcfly-ng2
[daviddm-dev-image]: https://david-dm.org/mcfly-io/generator-mcfly-ng2/dev-status.svg?theme=shields.io
[daviddm-dev-url]: https://david-dm.org/mcfly-io/generator-mcfly-ng2#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/mcfly-io/generator-mcfly-ng2/badge.svg
[coveralls-url]: https://coveralls.io/r/mcfly-io/generator-mcfly-ng2
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/mcfly-io/generator-mcfly-ng2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
