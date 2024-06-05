class Vec3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Tracker {
    position: Vec3;
    rotation: Vec3;
    id: number;

    constructor(id: number = 0, position: Vec3 = new Vec3(), rotation: Vec3 = new Vec3()) {
        this.id = id;
        this.position = position;
        this.rotation = rotation;
    }
}

class Scene {
    trackers: Tracker[];
    eventListeners: Map<string, Function[]>;

    constructor() {
        this.trackers = [];
        this.eventListeners = new Map();
    }

    callEvent(event: string, ...args: any[]) {
        if (!this.eventListeners.has(event)) return;
        this.eventListeners.get(event)?.forEach(callback => callback(...args));
    }

    addEventListener(event: string, callback: Function) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }

        this.eventListeners.get(event)?.push(callback);
    }

    addTracker(tracker: Tracker) {
        if (!tracker) tracker = new Tracker();
        this.trackers.push(tracker);
        this.callEvent("update", this);
    }

    removeTracker(id: number) {
        this.trackers = this.trackers.filter(tracker => tracker.id !== id);
        this.callEvent("update", this);
    }
}

const scene = new Scene();
export default scene;