import FullBowody from "./Core/bridge/FullBowody";

let intervalID: NodeJS.Timeout|null = null;

export function start() {
    FullBowody.Engine.start();
    intervalID = setInterval(() => {
        FullBowody.Engine.update(0.1);
    }, 20);
}

export function stop() {
    if (intervalID != null) {
        clearInterval(intervalID);
        intervalID = null;
    }
    FullBowody.Engine.stop();
}

export default { start, stop };