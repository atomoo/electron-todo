const {app, BrowserWindow, ipcMain, nativeTheme, Tray, Menu, nativeImage} = require('electron')
const path = require('node:path')

const isProduction = app.isPackaged || process.env.NODE_ENV === 'production';
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    isProduction ? win.loadFile('../dist/index.html') : win.loadURL('http://localhost:8080')
}

// ipcMain.handle('dark-mode:toggle', () => {
//     if (nativeTheme.shouldUseDarkColors) {
//         nativeTheme.themeSource = 'light'
//     } else {
//         nativeTheme.themeSource = 'dark'
//     }
//     return nativeTheme.shouldUseDarkColors
// })

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
    createWindow()
    const icon = nativeImage.createFromPath('')
    tray = new Tray(icon)
    // const contextMenu = Menu.buildFromTemplate([
    //     {label: 'Item1', type: 'radio'},
    //     {label: 'Item2', type: 'radio'},
    //     {label: 'Item3', type: 'radio', checked: true},
    //     {label: 'Item4', type: 'radio'}
    // ])

    // tray.setContextMenu(contextMenu)
    // tray.setToolTip('This is my application')
    tray.setTitle('This is my title' + Math.random())
    ipcMain.handle('dark-mode:toggle', () => {

        tray.setTitle('This is my title' + Math.random())
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})