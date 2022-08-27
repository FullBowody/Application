const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    // and load the index.html of the app.
    win.loadFile('./src/index.html');
};

app.whenReady().then(() => {
    createWindow();

    // if not MacOS, when all windows are closed, quit the app
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    });
    // If the application is activated and there are no windows, create a new one (MacOS standard)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    });
});