import { routes } from "../scripts/Routes";
import fs from 'fs';

let settings:any = null;
let settingsLoaded = false;
const SETTINGS_PATH:string = "./settings.json";
// TODO : fix settings not loading

const SETTINGS = {
    KEEP_RUNNING_CLOSED: "keep_running_closed",
    ENGINE_REFRESH_RATE: "engine_refresh_rate",
}

function loadSettings() {
    return new Promise((resolve, reject) => {
        fs.readFile(SETTINGS_PATH, (err, data) => {
            if (err) {
                console.error(err);
                reject("Error loading settings: "+err);
                return;
            }
            const parsed = JSON.parse(data.toString());
            if (parsed != null) settings = parsed;
            settingsLoaded = true;
            resolve(undefined);
        });
    });
}

let saveTimeout:any = null;
function saveSettings() {
    return new Promise((resolve, reject) => {
        if (saveTimeout != null) {
            clearTimeout(saveTimeout);
        }
        saveTimeout = setTimeout(() => {
            saveTimeout = null;
            fs.writeFile(SETTINGS_PATH, JSON.stringify(settings), (err) => {
                if (err) {
                    console.error(err);
                    reject("Error saving settings: "+err);
                    return;
                }
                resolve(undefined);
            });
        }, 1000);
    });
}

routes.settings_getKeepRunningClosed.onRequest((ev, data) => {
    return getSetting(SETTINGS.KEEP_RUNNING_CLOSED);
});

routes.settings_setKeepRunningClosed.onRequest((ev, data) => {
    return setSetting(SETTINGS.KEEP_RUNNING_CLOSED, data);
});

routes.settings_getEngineRefreshRate.onRequest((ev, data) => {
    return getSetting(SETTINGS.ENGINE_REFRESH_RATE);
});

routes.settings_setEngineRefreshRate.onRequest((ev, data) => {
    return setSetting(SETTINGS.ENGINE_REFRESH_RATE, data);
});

function getSetting(setting:string) {
    return new Promise((resolve, reject) => {
        if (!settingsLoaded) {
            loadSettings().then(() => {
                getSetting(setting)
                .then(res => resolve(res))
                .catch(err => reject(err));
            }).catch(err => reject(err));
            return;
        }

        const res = settings[setting];
        if (res != undefined) resolve(res);
        else reject("Setting not found ("+setting+")");
    });
}

function setSetting(setting:string, value:any) {
    return new Promise((resolve, reject) => {
        if (!settingsLoaded) {
            loadSettings().then(() => {
                setSetting(setting, value)
                .then(res => resolve(res))
                .catch(err => reject(err));
            }).catch(err => reject(err));
            return;
        }

        if (settings.hasOwnProperty(setting)) {
            settings[setting] = value;
            saveSettings().then(() => {
                resolve(undefined);
            }).catch(err => reject(err));
        } else {
            reject("Setting not found ("+setting+")");
        }
    });
}

export {getSetting, setSetting, SETTINGS};