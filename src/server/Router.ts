import { BrowserWindow, ipcMain, shell } from 'electron';
import { routes } from "../scripts/Routes";

ipcMain.on("setTitle", (ev, title) => {
    let window = BrowserWindow.getFocusedWindow();
    if (!window) BrowserWindow.getAllWindows()[0];
    if (!window) return;
    window.setTitle(title);
});

ipcMain.on("openLink", (ev, link) => {
    shell.openExternal(link);
});

import "./Extensions";
import "./Cameras";
import "./Settings";

routes.forEach(route => route.setupServer(ipcMain));