import { ipcMain } from "electron";
import { Command, CommandTree } from "../common/CommandTree";
import * as FBTypes from "../common/fbBridge";

const FG_YELLOW = "\x1b[33m";
const FG_GREEN = "\x1b[32m";
const FG_RESET = "\x1b[0m";

let fb = null;
try {
    const isDev = process.env.VITE_DEV_SERVER_URL !== undefined;
    const wrapperPath = isDev
        ? '../../dependencies/wrapper/build/Release/fullbowody.node'
        : process.cwd() + '/wrapper/fullbowody.node';
    fb = require(wrapperPath);
    console.log(FG_GREEN + "Fullbowody engine wrapper loaded successfully." + FG_RESET);
} catch (e) {
    console.warn(FG_YELLOW + "Warning : Engine node wrapper not found, engine communications are thus disabled." + FG_RESET)
    console.error(e);
}

export class EngineHandle {
    static _engine = null;
    static _interval = null;
    static _commandTree = null;
    static _enginePath = null;

    static SetEnginePath(path) {
        if (fb !== null) {
            if (EngineHandle._engine !== null) {
                fb.destroyEngine(EngineHandle._engine);
            }
            EngineHandle._enginePath = path;
            EngineHandle._engine = fb.createEngine(path);
            const result = EngineHandle._engine !== null;
            if (result) console.log(FG_GREEN + "Engine loaded successfully." + FG_RESET);
            else console.warn(FG_YELLOW + "Failed to load engine." + FG_RESET);
            return result;
        }
        return false;
    }

    static GetEngine() {
        return EngineHandle._engine;
    }

    static DestroyEngine() {
        if (EngineHandle._interval !== null) {
            clearInterval(EngineHandle._interval);
        }

        if (EngineHandle._engine !== null) {
            if (fb !== null) {
                fb.destroyEngine(EngineHandle._engine);
            }
        }
    }

    static Init() {
        this._commandTree = new CommandTree({
            Scene: {
                Markers: {
                    [Command.GET]: () =>   {
                        return this.GetEngine().getScene().getMarkers().map(m => FBTypes.Marker.FromFB(m));
                    }
                },
                Marker: {
                    [Command.GET]: (index) => {
                        const marker = this.GetEngine().getScene().getMarker(index);
                        if (!marker) return null;
                        return FBTypes.Marker.FromFB(marker).toJson();
                    },
                    [Command.SET]: (index, id, pose) => {
                        const marker = this.GetEngine().getScene().getMarker(index);
                        if (!marker) return null;
                        if (id != undefined) marker.setId(id);
                        if (pose != undefined) marker.setPose(FBTypes.Pose.FromJson(pose).toFB(fb));
                        return true;
                    },
                    [Command.ADD]: (id, pose) =>   {
                        if (id === undefined || pose === undefined) return null;
                        const marker = this.GetEngine().getScene().createMarker(id, FBTypes.Pose.FromJson(pose).toFB(fb));
                        return FBTypes.Marker.FromFB(marker);
                    },
                    [Command.REM]: (index) => {
                        return this.GetEngine().getScene().destroyMarker(index);
                    }
                },

                Cameras: {
                    [Command.GET]: () =>   {
                        return this.GetEngine().getCameras().map(c => FBTypes.Camera.FromFB(c));
                    }
                },
                Camera: {
                    [Command.GET]: (id) => {
                        const camera = this.GetEngine().getCamera(id);
                        if (!camera) return null;
                        return FBTypes.Camera.FromFB(camera).toJson();
                    },
                    [Command.ADD]: (pluginName) =>   {
                        if (pluginName === undefined) return null;
                        const camera = this.GetEngine().createCamera(pluginName);
                        return FBTypes.Camera.FromFB(camera);
                    },
                    [Command.REM]: (id) => {
                        return this.GetEngine().destroyCamera(id);
                    }
                }
            }
            // TODO : Rest of API (Plugins, ...)
        });
        this._commandTree.setupIPC(ipcMain);
    }
}
