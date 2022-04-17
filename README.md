## 摸鱼APP-塑料版
- 前言:在 [全球最大同性交友平台](https://github.com/DinoChan/Loaf) 发现了一款APP，深得我心，于是本着钻研的精神，用electron + HTML 手搓了一个兼容MacOS与Windows版，至于为什么不直接挂一个HTML的链接出来，主要还是想学习一下electron的一大波知识。

### 关于Have-a-break
一个平平无奇的塑料版摸鱼APP，Windows版目前只兼容win10以上的系统。Windows更新的动画借鉴(搬运)自： [Pure CSS Windows10 Loader](https://codepen.io/feebaa/pen/PPrLQP)

win10下的表现如图
![](https://github.com/WannTonn/have-a-break/blob/master/src/assets/images/win.jpg?raw=true)
MacOS 下的表现如图
![](https://github.com/WannTonn/have-a-break/blob/master/src/assets/images/mac.jpg?raw=true)

### 注意
- Windows下的exe文件实际上是一个由WinRAR压缩制作的自解压格式的压缩包，如果双击打开没反应(解压的过程是静默解压，没有进度显示)，稍微等待一下就好。
### 项目安装与运行
- npm install 的过程中，可能会遇到electron下载很慢的问题，解决方法如下
  - 打开[electron的国内镜像](https://npm.taobao.org/mirrors/electron/),找到你需要下载的版本(这里我用到了16.0.6，那就找到[16.0.6的windows镜像](https://npm.taobao.org/mirrors/electron/16.0.6/electron-v16.0.6-win32-x64.zip)与[16.0.6的macOS镜像](https://npm.taobao.org/mirrors/electron/16.0.6/electron-v16.0.6-darwin-x64.zip))
  - 镜像下载完成后，找到项目`node_modules/electron/` 目录，将刚才下载好的electron离线安装包(electron-v16.0.6-win32-x64.zip)拷贝到`node_modules/electron/` 目录下，然后编辑install.js。 找到第38行(可能),改成如下。
  - ```javascript
    // downloads if not cached
    /* downloadArtifact({
      version,
      artifactName: 'electron',
      force: process.env.force_no_cache === 'true',
      cacheRoot: process.env.electron_config_cache,
      checksums: process.env.electron_use_remote_checksums ? undefined : require('./checksums.json'),
      platform,
      arch
    }).then(extractFile).catch(err => {
      console.error(err.stack);
      process.exit(1);
    }); */
    let path_ = path.join(__dirname, './electron-v16.0.5-darwin-x64.zip'); // 这里后面的zip名字要改成下载好的zip的文件名, 或者直接改成electron.zip。
    extractFile(path_);
    ```
  - 然后在当前项目的命令行中输入: `node node_modules/electron/install.js`。观察`node_modules/electron/`是否出现`dist`文件夹。如果有。那么就可以运行项目了。
  - npm run dev 本地运行
### 摸鱼插件的安装与运行
- 下载`have-a-break.crx`
- 将后缀名 `.crx` 改成 `.zip`
- 解压到任意文件夹下， 比如 `have-a-break/`
- 打开Chrome浏览器，URL栏输入`chrome://extensions/`,回车即跳转到扩展程序页面，勾选右上角的`开发者模式`
- 点击`加载已解压的扩展程序`,选择 `have-a-break` 文件夹
- 点击 icon， 再点击 `开始摸鱼吧` 的按钮
- 由于Chrome的限制，无法自行模拟点击，需要再点击一下黑色背景即可自行全屏
- enjoy
### 最后
软件的出发点并非在上班摸鱼，只是在针对性需求中寻找能学习到知识的点。待解决的地方：electron打包体积过大等，这些可以换成在浏览器插件中实现。在此仅作为一个记录的日志。