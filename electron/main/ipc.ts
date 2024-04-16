import { ipcMain, shell } from "electron";

ipcMain.on("open-url", (event, ...args) => {
    shell.openExternal(args[0]);
});
