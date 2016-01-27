# <%=appname%>


## Usage

You have access to the following npm scripts
* npm run clean (clean the `dist` folder)
* npm run build (build the code to the `dist` folder)
* npm run browsersync (open a live browser, recompiling the code on each change)
* npm run webpack-server (same as browsersync but uses webpack-dev-server)
* npm run lint (run eslint and tslint)
* npm run karma (run unit test)

## Distribution
Note that the code is distributed to the `dist` folder
You can pass a different TARGET or MODE using the following command:
Default TARGET is `app`
MODE can be either `prod` or `dev`
```sh
[TARGET=newtarget MODE=dev] npm run build
```

`npm run webpack-server`:  compile and open a the webpack reload browser
You can pass a different TARGET or MODE using the following command:
```sh
[TARGET=newtarget MODE=dev] npm run webpack-server
```