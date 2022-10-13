import { app, protocol, BrowserWindow, Tray, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import { getSetting, SETTINGS } from './server/Settings';

import path from 'path';
declare const __static: string;

import "./server/Router";
import Engine from "./server/Engine";

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function shutdown() {
    Engine.stop();
    app.quit();
}

function openWindowIfClosed() {
    if (BrowserWindow.getAllWindows().length > 0) {
        BrowserWindow.getAllWindows()[0].show();
    } else {
        createWindow();
    }
}

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: "FullBowody",
        webPreferences: {
            nodeIntegration: false && process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: true || !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: false,
            preload: path.resolve(__static, "server/preload.ts"),
        },
        autoHideMenuBar: true
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }
}

let tray = null;
app.whenReady().then(() => {
    tray = new Tray("src/assets/icon.png");
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open UI', type: 'normal', click: openWindowIfClosed },
        { label: 'Separator', type: 'separator' },
        { label: 'Shutdown', type: 'normal', click: shutdown }
    ]);
    tray.setToolTip('FullBowody');
    tray.setContextMenu(contextMenu);
    tray.setIgnoreDoubleClickEvents(true);

    tray.on("click", (ev, bounds, position) => {
        openWindowIfClosed();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    
    getSetting(SETTINGS.KEEP_RUNNING_CLOSED).then(keep => {
        if (!keep && process.platform !== 'darwin') {
            shutdown();
        }
    }).catch(err => console.error(err));
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e:any) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    Engine.start();
    createWindow()
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                shutdown();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            shutdown();
        });
    }
}
