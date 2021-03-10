const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { spawn } = require('child_process')
const path = require('path')

// this is the absolute path to the multiverse binary
const multi = app.isPackaged
  ? path.join(process.resourcesPath, 'bin', 'multi')
  : path.join(__dirname, '..', 'bin', `${process.platform}_${process.arch}`, 'multi')

let daemon = null
let daemonTimeout = null
let daemonStatus = false
let mainWindow = null

// send a message to the main window
const sendWindow = (channel, ...params) => mainWindow && mainWindow.webContents.send(channel, ...params)

// create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 1280,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // open external links in a new browser window
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  if (app.isPackaged) {
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  } else {
    mainWindow.loadURL('http://localhost:8080')
  }
}

// starts the daemon and listens for exit conditions
function startDaemon() {
  daemon = spawn(multi, ['daemon'])
  daemon.on('close', restartDaemon)
  daemon.on('error', restartDaemon)
  daemon.on('exit', restartDaemon)

  // daemon is ready when stdout prints
  daemon.stdout.on('data', (data) => {
    daemonStatus = true
    sendWindow('daemon/up', `${data}`)
  })

  daemon.stderr.on('data', (data) => {
    sendWindow('daemon/error', `${data}`)
  })
}

// restart the daemon and schedule a restart
function restartDaemon(code) {
  // ignore restarts when kill is called
  if (daemon && daemon.killed) return

  daemon = null
  daemonStatus = false

  clearTimeout(daemonTimeout)
  daemonTimeout = setTimeout(startDaemon, 5_000)
  
  sendWindow('daemon/down', `${code}`)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startDaemon()
  createWindow()
})

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (!mainWindow) createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// kill the daemon process when the app quits
app.on('quit', () => {
  if (daemon) daemon.kill()
})

// returns the daemon status
ipcMain.on('daemon/status', (event) => {
  event.returnValue = daemonStatus
})

// minimize the main window
ipcMain.on('window/minimize', () => {
  if (mainWindow) mainWindow.minimize()
})

// maximize or unmaximize the main window
ipcMain.on('window/maximize', () => {
  if (mainWindow) mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
})

// close the main window
ipcMain.on('window/close', () => {
  if (mainWindow) mainWindow.close()
})
