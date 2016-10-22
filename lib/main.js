const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let mainWindow = null

app.on('ready', () => {
  console.log('The application is ready.')

  mainWindow = new BrowserWindow({height:600, width: 800, x: 0, y: 0, frame: false})

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
