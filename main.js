const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'; // 如果是MacOS
const isWin = process.platform === 'win32'; // 如果是Windows
let mainWindow;
function createWindow() {
   mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
    fullscreen: true,
    frame: isMac, // 关闭顶部操作栏
  });

  mainWindow.loadFile('./src/pages/index.html');

}
// 配置键盘菜单快捷键,当前只支持macOS + win10  所以非mac就是win，win下关闭菜单
const menu = new Menu();
menu.append(new MenuItem({
  submenu: [{
    label: '退出',
    role: 'quit',
    accelerator: isMac ? 'Cmd+Q' : 'Alt+F4',
  }]
}));

Menu.setApplicationMenu(isMac ? menu : null);

// 当electron初始化完成的时候
app.whenReady().then(async () => {
  createWindow();
}).then(() => {
  // 注册退出的快捷键
  globalShortcut.register('Esc', () => {
    app.quit();
  })
})
// 如果是Windows 只允许开一个应用
if (isWin) {
  const getTheLock = app.requestSingleInstanceLock();
  if (!getTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();

        mainWindow.focus();
        mainWindow.show();
      }
    })
  }

}
// 当没有窗口打开时，则打开一个新窗口（MacOS）
app.on('activate', function () {
  if (!BrowserWindow.getAllWindows().length) createWindow();
});
// 当electron关闭所有窗口时，退出应用。
app.on('mainWindow-all-closed', function () {
  if (isWin) app.quit();
})
// 当APP退出的时候取消注册快捷键
app.on('will-quit', () => globalShortcut.unregisterAll())