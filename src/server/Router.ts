import { BrowserWindow, ipcMain, shell } from 'electron';
import { routes } from "../scripts/Routes";
import FullBowody from './Core/bridge/FullBowody';

ipcMain.on("setTitle", (ev, title) => {
    let window = BrowserWindow.getFocusedWindow();
    if (!window) BrowserWindow.getAllWindows()[0];
    if (!window) return;
    window.setTitle(title);
});

ipcMain.on("openLink", (ev, link) => {
    shell.openExternal(link);
});

routes.getExtensionServerState.setCallback((ev, data) => {
    return {
        state: "Running", // (Running, Stopped, Error)
        ip: "192.168.1.42",
        port: 5621
    }
});

routes.getExtensions.setCallback((ev, data) => {
    return FullBowody.ExtensionsServer.getExtensions().map(ext => ({name: ext.getName(), ip: ext.getIp(), port: ext.getPort(), id: ext.getIp() + ":" + ext.getPort()}));
});

routes.disconnectExtension.setCallback((ev, data) => {
    return true;
});

routes.forEach(route => route.setup(ipcMain));