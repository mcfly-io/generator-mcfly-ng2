# <%=appname%>


## Usage

You have access to the following npm scripts
* **npm run clean** (clean the `dist` folder)
* **npm run build** (build the code to the `dist` folder)
* **npm run browsersync** (open a live browser on port 5000, recompiling the code on each change)
* **npm run webpack-server** (same as browsersync but uses webpack-dev-server)
* **npm run lint** (run eslint and tslint)
* **npm run karma** (run unit test)

## Distribution
Note that the code is distributed to the `dist` folder
You can pass a different TARGET or MODE using the following command:

```sh
[TARGET=newtarget MODE=dev] npm run build
```

Default TARGET is `app`, possible values will depends if you have scaffolded other targets   
Default MODE is `dev`, can be either `prod` or `dev`    

The same apply to the `webpack-server` task or `browsersync` task
`npm run webpack-server`:  compile and open a the webpack reload browser
You can pass a different TARGET or MODE using the following command:
```sh
[TARGET=newtarget MODE=dev] npm run webpack-server
```

## Launching
```sh
npm run webpack-server
# or
npm run browsersync
```
Visit your browser at `http://localhost:5000`