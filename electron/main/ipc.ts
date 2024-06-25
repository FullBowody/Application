import { ipcMain, shell, BrowserWindow } from "electron";

ipcMain.on("open-url", (event, ...args) => {
    shell.openExternal(args[0]);
});

export enum NotificationType {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success"
}

export function addNotification(type: NotificationType, title: string, message: string, duration: number = 1000) {
    const notif = {
        type: type,
        title: title,
        message: message,
        duration: duration
    };
    
    const windows = BrowserWindow.getAllWindows();
    windows.forEach(window => {
        window.webContents.send('notification', notif);
    });
}
