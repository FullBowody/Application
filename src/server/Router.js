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

routes.getExtensionServerState.setCallback((ev, data) => {
    return {
        state: "Running", // (Running, Stopped, Error)
        ip: "192.168.1.42",
        port: 5621
    }
});

routes.getExtensions.setCallback((ev, data) => {
    return [
        {
            name: "Steam VR",
            icon: "unknown",
            ip: "127.0.0.1",
            port: 1342,
            id: "steamvr"
        },
        {
            name: "Blender",
            icon: "unknown",
            ip: "127.0.0.1",
            port: 7896,
            id: "blender"
        }
    ];
});

routes.disconnectExtension.setCallback((ev, data) => {
    return true;
});

routes.forEach(route => route.value.setup(ipcMain));