const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    send: ipcRenderer.send,
    on: ipcRenderer.on
});