const STATE_ERROR = 0;
const STATE_STOPPED = 1;
const STATE_STARTED = 2;
const STATE_STARTING = 3;
const STATE_STOPPING = 4;

const STATE = {
    STATE_ERROR,
    STATE_STOPPED,
    STATE_STARTED,
    STATE_STARTING,
    STATE_STOPPING,
    stateString
};

function stateString(state) {
    switch (state) {
        case STATE_ERROR: return "Error";
        case STATE_STOPPED: return "Stopped";
        case STATE_STARTED: return "Started";
        case STATE_STARTING: return "Starting";
        case STATE_STOPPING: return "Stopping";
        default: return "Unknown";
    }
}

function openLink(link) {
    if (link.startsWith("http"))
        ipc.send("openLink", link);
    else window.location.href = link;
}

export {
    openLink,
    STATE
}