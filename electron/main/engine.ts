import { ipcMain } from "electron";

const FG_YELLOW = "\x1b[33m";
const FG_GREEN = "\x1b[32m";
const FG_RESET = "\x1b[0m";

let fb = null;
try {
    fb = require('../../dependencies/wrapper/build/Release/fullbowody.node');
    console.log(FG_GREEN + "Fullbowody engine wrapper loaded successfully." + FG_RESET);
} catch (e) {
    console.warn(FG_YELLOW + "Warning : Engine node wrapper not found, engine communications are thus disabled." + FG_RESET)
}

export class EngineHandle {
    static _engine = null;
    static _interval = null;

    static Init() {
        ipcMain.handle("get-cameras", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            return EngineHandle.GetEngine().getCameras().map((cam, index) => ({
                id: index,
                name: "Camera " + index
            }));
        });
        ipcMain.handle("get-cam-infos", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            const id = args[0];
            const cam = EngineHandle.GetEngine().getCamera(id);
            return {
                id: id,
                name: "Camera " + id,
                resolution: {
                    width: cam.getWidth(),
                    height: cam.getHeight()
                }
            };
        });
        ipcMain.handle("create-camera", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            if (args.length !== 1) return null;
            return EngineHandle.GetEngine().createCamera(args[0]) != null;
        });
        ipcMain.handle("delete-camera", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            const id = args[0];
            return EngineHandle.GetEngine().destroyCamera(
                EngineHandle.GetEngine().getCamera(id)
            );
        });
        ipcMain.handle("set-cam-param", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            const id = args[0];
            const param = args[1];
            const value = args[2];
            const cam = EngineHandle.GetEngine().getCamera(id);
            if (cam === null) return false;
            return cam.setParam(param, value);
        });
        ipcMain.handle("start-cam", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            const id = args[0];
            const cam = EngineHandle.GetEngine().getCamera(id);
            if (cam === null) return false;
            return cam.startTracking();
        });
        ipcMain.handle("stop-cam", async (event, ...args) => {
            if (EngineHandle._engine === null) return null;
            const id = args[0];
            const cam = EngineHandle.GetEngine().getCamera(id);
            if (cam === null) return false;
            return cam.stopTracking();
        });

        EngineHandle._interval = setInterval(() => {
            if (EngineHandle._engine !== null) {
                // TODO : Update with the real delta time
                EngineHandle.GetEngine().update(0.016);
            }
        }, 16);
    }

    static SetEnginePath(path) {
        if (fb !== null) {
            if (EngineHandle._engine !== null) {
                fb.destroyEngine(EngineHandle._engine);
            }
            EngineHandle._engine = fb.createEngine(path);
            return EngineHandle._engine !== null;
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
}
