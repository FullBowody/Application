const FG_YELLOW = "\x1b[33m";
const FG_GREEN = "\x1b[32m";
const FG_RESET = "\x1b[0m";

let fb = null;
try {
    fb = require('../../dependencies/wrapper/build/Release/fullbowody.node');
    console.log(FG_GREEN + "Fullbowody engine wrapper loaded successfully." + FG_RESET);
} catch (e) {
    console.error(FG_YELLOW + "Warning : Engine node wrapper not found, engine communications are thus disabled." + FG_RESET)
}

export class EngineHandle {
    static _engine = null;

    static Init() {
        // nothing to do, just to load the wrapper at boot
    }

    static SetEngineFolder(folder) {
        if (fb !== null) {
            if (EngineHandle._engine !== null) {
                fb.destroyEngine(EngineHandle._engine);
            }
            EngineHandle._engine = fb.createEngine(folder);
            return EngineHandle._engine !== null;
        }
        return false;
    }

    static GetEngine() {
        return EngineHandle._engine;
    }

    static DestroyEngine() {
        if (EngineHandle._engine !== null) {
            if (fb !== null) {
                fb.destroyEngine(EngineHandle._engine);
            }
        }
    }
}
