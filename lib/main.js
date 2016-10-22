const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const fs = require('fs')

const dialog = electron.dialog

let openFile = () => {
  const files = dialog.showOpenDialog(mainWindow, {buttonLabel: 'Fuck Yeah Electron!', properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
  ]
})
  if(!files){
    return
  }
  const file = files[0]
  const content = fs.readFileSync(file, 'utf8')
  mainWindow.webContents.send('file-opened', file, content)
}

let mainWindow = null

app.on('ready', () => {
  console.log('The application is ready.')

  mainWindow = new BrowserWindow({height:600, width: 800, x: 0, y: 0, frame: false})

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {
    openFile()
  })

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
