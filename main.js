const { app, shell, BrowserWindow, Menu, } = require('electron')
const path = require('path')
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'

const config = {
  useContentSize: true,
  width: 1281,
  height: 800,
  center: true,
  backgroundColor: '#fff',
  title: 'Microsoft Teams',
  icon: path.resolve(__dirname, 'assets/icons/png/256x256.png'),
  show: true,
  autoHideMenuBar: true,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: false,
    allowDisplayingInsecureContent: true,
    allowRunningInsecureContent: true,
    plugins: true,
    preload: path.resolve(__dirname, 'src/preload.js'),
  },
}

app.on('window-all-closed', function () {
  process.platform !== 'darwin' && app.quit()
})

app.on('ready', function () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(require('./src/menu')))

  let win = new BrowserWindow(config)
  win.loadURL("https://teams.microsoft.com", { userAgent: USER_AGENT })
  win.on('closed', function () {
    win = null
  })

  win.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    shell.openExternal(url)
  })

  win.show()
})
