import { ipcMain, shell } from "electron";
import fs from "fs";

ipcMain.on("open-url", (event, url) => {
    shell.openExternal(url);
});

ipcMain.on("save-settings", (event, settings) => {
    currentSettings = settings;
    fs.writeFile("settings.json", JSON.stringify(settings), (err) => {
        if (err) { console.error(err); }
    });
});

let currentSettings: undefined|any = undefined;
export function getSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
        if (currentSettings !== undefined) {
            resolve(currentSettings);
        } else {
            fs.readFile("settings.json", (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    currentSettings = JSON.parse(data.toString());
                    resolve(currentSettings);
                }
            });
        }
    });
}

export function getSetting(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        getSettings().then((settings) => {
            resolve(settings[name]);
        }).catch((err) => {
            reject(err);
        });
    });
}