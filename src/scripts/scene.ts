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
        this.callEvent("trackerAdd", tracker);
    }

    removeTracker(id: number) {
        this.trackers = this.trackers.filter(tracker => tracker.id !== id);
        this.callEvent("trackerRemove", id);
    }

    getTracker(id: number) {
        return this.trackers.find(tracker => tracker.id === id);
    }

    setTrackerId(id: number, newId: number) {
        const tracker = this.trackers.find(tracker => tracker.id === id);
        if (!tracker) return;
        tracker.id = newId;
        this.callEvent("trackerIDUpdate", {
            oldId: id,
            newId
        });
    }

    setTrackerPos(id: number, position: Vec3) {
        const tracker = this.trackers.find(tracker => tracker.id === id);
        if (!tracker) return;
        tracker.position = position;
        this.callEvent("trackerPoseUpdate", {
            id: tracker.id,
            position: tracker.position,
            rotation: tracker.rotation
        });
    }

    setTrackerRot(id: number, rotation: Vec3) {
        const tracker = this.trackers.find(tracker => tracker.id === id);
        if (!tracker) return;
        tracker.rotation = rotation;
        this.callEvent("trackerPoseUpdate", {
            id: tracker.id,
            position: tracker.position,
            rotation: tracker.rotation
        });
    }
}

const scene = new Scene();
export default scene;
