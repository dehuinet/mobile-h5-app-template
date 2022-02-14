# mobile-h5-app-template

敏行`H5`插件开发模板。

## 模板的配置与安装

1. 安装[敏行`vscode`开发者插件](https://marketplace.visualstudio.com/items?itemName=minxing.vscode-minxing-extension)
2. 重启`vscode`
3. 从`vscode`菜单项【文件】->【首选项】->【设置】->【用户】，打开【设置界面】
4. 搜索关键字`vue-seed-origin`
5. 点击【在`settings.json`中编辑】，打开`settings.json`文件
6. 修改配置项`Minxing.vue-seed-origin`的值为[github@dehuinet/mobile-h5-app-template](https://github.com/dehuinet/mobile-h5-app-template/)
7. 重启`vscode`
8. 敲击`F1`，录入`minxing`关键字，选择【新建`vue`项目】，输入【项目名】，点击【创建 vue 种子项目模板】按钮。
9. 然后，新版本的【敏行`H5`插件工程】就落地了。
10. 在插件工程内，字符串全局替换`mobile-h5-app-template`为你的【工程名】字符串。
11. 如果感觉必要，也可以从`readme.md`文件内，删除模板介绍文档，换为工程自身的描述信息。

## 工程依赖包的安装

### 配置环境变量

推荐直接将下面的环境变量都直接配置到【我的电脑】里。这样就不需要每次都`ctrl+v`一次了。有了这些“淘宝镜像”的环境变量，`npm`依赖的下载速度能快特别地多。同时，对于某些依赖项，也不要求【科学上网】了。

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
npm i --registry=http://npm.dehuinet.com:8100
```

## 以开发模式启动工程

从`vscode`菜单项【终端】->【运行任务】->【`npm dev`】。然后，在`vscode`集成终端内，会出现如下内容：  ![image](https://user-images.githubusercontent.com/13935927/153797779-2d2b5041-1dff-469e-b6b2-83e9ac03af07.png)

* 本地开发服务器监听于`9010`端口。
* 点击【敏行开发服务器管理界面】右侧的链接地址：http://192.168.50.238:9010/minxing-dev-server。打开如下界面。注意下面截图内的红色标注提示文本。

![image](https://user-images.githubusercontent.com/13935927/153799506-c963619d-b176-4331-aeb9-8babee447789.png)

* 启动【敏行-移动端】，点击右上解的【扫一扫】按钮
* 扫描电脑端【敏行开发服务器管理界面】左侧的【二维码】
  * 若你的电脑上多个网卡的话，会出现多个【二维码】，请注意点击二维码两侧的左右箭头，以选择正确的网卡`ip`地址。

推送被预编译的`H5`插件至移动端有两个选择：

* 点击【预览】按钮，以`webview +`拉取`dev server`动态网页的形式，在移动端打开`H5`插件界面。
  * 支持`webpack`的热更新，因为`web socket`不跨域
* 点击【全量推送】按钮，将本地`vue`程序预编译和打包为`zip`文件传并递给【敏行-移动端】。然后，移动端本地拉起`H5`插件。
  * 不支持`webpack`的热更新，因为`web socket`跨域了

手机上的运行时日志会被以倒序的方式输出到【敏行开发服务器管理界面】右下方的列表里。

### 彩蛋1

在`vscode`的【集成终端】内，也会输出一个【二维码】，若使用【敏行-移动端】【扫一扫】的功能直接扫码，便可直接达到点击【预览】按钮的效果。![image](https://user-images.githubusercontent.com/13935927/153809640-b651ac50-171a-4f16-b479-a41552880d84.png)

### 彩蛋2

在【预览】按钮左侧的输入框是可编辑的。若早先曾经执行过`npm run build`指令，那么

1. 再给左侧输入框内容字符串添加`/www/index.html`的后缀，
2. 接着，点击【预览】按钮

便可以预览被打包后程序的运行状态了。

![image](https://user-images.githubusercontent.com/13935927/153809718-4471b3db-8ac6-4d80-bcb5-edafcb8f9a0b.png)

## 预编译与打包工程

1. 首先，请先终止`npm run dev`进程，通过点击`vscode`的【集成终端】右上角的“垃圾箱”图标

   ![image](https://user-images.githubusercontent.com/13935927/153806588-a9f960ec-9d76-4492-b325-ee346fffd3e7.png)

2. 然后，从`vscode`菜单项【终端】->【运行任务】->【`npm build`】
3. `vue`程序将会被预编译与输出到`dist/www`文件夹下。
4. 同时，一款`H5`插件的`zip`包也会被生成与保存于`dist`目录下。
5. 被生成的`zip`包完全能够直接从【敏行-应用中心】上架。

### `H5`插件的配置文件

`config\config.properties`与`config\plugin.properties`是`H5`插件的配置文件。他们会被复制入被生成的`H5`插件`zip`包里。

|源文件目录|`zip`包内目录|
|----|-----|
|`config\config.properties`|`/www/config.properties`|
|`config\plugin.properties`|`/plugin.properties`|

其中，在`config\plugin.properties`文件内的`version_code`与`version_name`字段代表了`H5`插件的版本号，需要每次打包前手动递增`1`。

## 定义自己的工程模板

需要两步：

1. 在`github`上创建一个`public vue`工程。类似于，[mobile-h5-app-template](https://github.com/dehuinet/mobile-h5-app-template)
2. 修改【敏行`vscode`插件】配置项`Minxing.vue-seed-origin`。配置值的格式为：

   `github@<组织名>/<工程名>`。举个例子，`github@dehuinet/mobile-h5-app-template`。

3. 重启`vscode`
4. 敲击`F1`，录入`minxing`关键字，选择【新建`vue`项目】，输入【项目名】，点击【创建 vue 种子项目模板】按钮。
