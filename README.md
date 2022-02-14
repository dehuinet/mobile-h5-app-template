# mobile-h5-app-template

敏行`H5`插件开发模板。

## 配置与安装

1. 安装[敏行`vscode`开发者插件](https://marketplace.visualstudio.com/items?itemName=minxing.vscode-minxing-extension)
2. 重启`vscode`
3. 从`vscode`菜单项【文件】->【首选项】->【设置】->【用户】，打开【设置界面】
4. 搜索关键字`vue-seed-origin`
5. 点击【在`settings.json`中编辑】，打开`settings.json`文件
6. 修改配置项`Minxing.vue-seed-origin`的值为[github@dehuinet/mobile-h5-app-template](https://github.com/dehuinet/mobile-h5-app-template/)
7. 重启`vscode`
8. 敲击`F1`，录入`minxing`关键字，选择【新建`vue`项目】，输入【项目名】，点击【创建 vue 种子项目模板】按钮。
9. 然后，新版本的【敏行`H5`插件工程】就落地了。

## 安装依赖包

### 配置环境变量

推荐直接将下面的环境变量都直接配置到【我的电脑】里。这样就不需要每次都`ctrl+v`一次了。

```bat
set NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
set NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
set NVMW_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
set NVMW_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
set NVMW_NPM_MIRROR=http://npm.taobao.org/mirrors/npm
set PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs
set CHROMEDRIVER_CDNURL=https://npm.taobao.org/mirrors/chromedriver
set OPERADRIVER_CDNURL=http://npm.taobao.org/mirrors/operadriver
set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
set SQLITE3_BINARY_SITE=http://npm.taobao.org/mirrors/sqlite3
set PYTHON_MIRROR=http://npm.taobao.org/mirrors/python
set PROFILER_BINARY_HOST_MIRROR=http://npm.taobao.org/mirrors/node-inspector/
set NPM_CONFIG_PROFILER_BINARY_HOST_MIRROR=http://npm.taobao.org/mirrors/node-inspector/
set PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors
set SENTRYCLI_CDNURL=https://npm.taobao.org/mirrors/sentry-cli
set NODE_INSPECTOR_CDNURL=https://npm.taobao.org/mirrors/node-inspector
set SELENIUM_CDNURL=https://npm.taobao.org/mirrors/selenium
set DISTURL=https://npm.taobao.org/dist
```

### 执行依赖安装

进入到项目工程根目录和执行

```bat
npm i -g --registry=http://npm.dehuinet.com:8100
```

## 以开发模式启动工程

从`vscode`菜单项【终端】->【运行任务】->【`npm dev`】。然后，在`vscode`集成终端内，会出现如下内容：  ![image](https://user-images.githubusercontent.com/13935927/153797779-2d2b5041-1dff-469e-b6b2-83e9ac03af07.png)

* 本地开发服务器监听于`9010`端口。
* 点击【敏行开发服务器管理界面：】后面的链接地址：http://192.168.50.238:9010/minxing-dev-server

![image](https://user-images.githubusercontent.com/13935927/153799506-c963619d-b176-4331-aeb9-8babee447789.png)


