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

class Marker {
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
    markers: Marker[];
    eventListeners: Map<string, Function[]>;

    constructor() {
        this.markers = [];
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

    addMarker(marker: Marker) {
        let markerId = 0;
        while (this.markers.find(marker => marker.id === markerId))
            markerId++;
        if (!marker) marker = new Marker(markerId);
        this.markers.push(marker);
        this.callEvent("markerAdd", marker);
    }

    removeMarker(id: number) {
        this.markers = this.markers.filter(marker => marker.id !== id);
        this.callEvent("markerRemove", id);
    }

    getMarker(id: number) {
        return this.markers.find(marker => marker.id === id);
    }

    setMarkerId(id: number, newId: number) {
        const marker = this.markers.find(marker => marker.id === id);
        if (!marker) return;

        // skip already used ids
        const diff = newId - id > 0 ? 1 : -1;
        while (this.markers.find(marker => marker.id === newId)) {
            newId += diff;
            if (newId < 0) // if newId is negative, set it to max id + 1
                newId = this.markers.reduce((max, mrk) => Math.max(max, mrk.id), 0) + 1;
        }

        marker.id = newId;
        this.callEvent("markerIDUpdate", {
            oldId: id,
            newId
        });
    }

    setMarkerPos(id: number, position: Vec3) {
        const marker = this.markers.find(marker => marker.id === id);
        if (!marker) return;
        marker.position = position;
        this.callEvent("markerPoseUpdate", {
            id: marker.id,
            position: marker.position,
            rotation: marker.rotation
        });
    }

    setMarkerRot(id: number, rotation: Vec3) {
        const marker = this.markers.find(marker => marker.id === id);
        if (!marker) return;
        marker.rotation = rotation;
        this.callEvent("markerPoseUpdate", {
            id: marker.id,
            position: marker.position,
            rotation: marker.rotation
        });
    }
}

const scene = new Scene();
export default scene;
