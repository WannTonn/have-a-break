const { app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem, Notification } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'; // 如果是MacOS
const isWin = process.platform === 'win32'; // 如果是Windows
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      enableRemoteModule: true,
      // preload: path.join(__dirname + '/src/assets/js', 'preload.js'),
    }
  });
  // 切换暗黑模式
  if (isMac) {
    ipcMain.handle('dark-mode:toggle', () => {
      nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
      return nativeTheme.shouldUseDarkColors;
    })
    ipcMain.handle('dark-mode:system', () => {
      nativeTheme.themeSource = 'system';
    })
  }

  mainWindow.loadFile('./src/pages/index.html');

}
// 配置键盘快捷键
const menu = new Menu();
menu.append(new MenuItem({
  submenu: [{
    label: '退出',
    role: 'quit',
    accelerator: isMac ? 'Cmd+Q' : 'Alt+F4',
  }]
}));

Menu.setApplicationMenu(menu);

// 当electron初始化完成的时候
app.whenReady().then(async () => {
  createWindow();
})
// 当没有窗口打开时，则打开一个新窗口（MacOS）
app.on('activate', function () {
  if (!BrowserWindow.getAllWindows().length) createWindow();
});
// 当electron关闭所有窗口时，退出应用。
app.on('mainWindow-all-closed', function () {
  if (isWin) app.quit();
})
