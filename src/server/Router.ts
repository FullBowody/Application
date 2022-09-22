import { BrowserWindow, ipcMain, shell, webContents } from 'electron';
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

routes.startExtensionServer.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            FullBowody.ExtensionsServer.start().then(resolve).catch(reject);
        }, 500);
    })
});
routes.stopExtensionServer.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            FullBowody.ExtensionsServer.stop().then(resolve).catch(reject);
        }, 500);
    })
});

routes.getExtensionServerInfos.onRequest((ev, data) => {
    return FullBowody.ExtensionsServer.getInfos();
});

routes.getExtensions.onRequest((ev, data) => {
    return FullBowody.ExtensionsServer.getExtensions().map(ext => ({
        name: ext.getName(),
        ip: ext.getIp(),
        port: ext.getPort(),
        id: ext.getIp() + ":" + ext.getPort()
    }));
});

routes.disconnectExtension.onRequest((ev, data) => {
    return true;
});

routes.forEach(route => route.setupServer(ipcMain));