import { BrowserWindow, ipcMain, shell } from 'electron';

ipcMain.on("setTitle", (event, title) => {
    let window = BrowserWindow.getFocusedWindow();
    if (!window) BrowserWindow.getAllWindows()[0];
    if (!window) return;
    window.setTitle(title);
});

ipcMain.on("openLink", (event, link) => {
    shell.openExternal(link);
});