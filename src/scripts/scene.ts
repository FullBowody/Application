
import * as cmd from "../../electron/common/CommandTree";
import * as FBTypes from "../../electron/common/fbBridge";

class Scene {
    markers: FBTypes.Marker[];
    eventListeners: Map<string, Function[]>;

    constructor() {
        this.markers = [];
        this.eventListeners = new Map();
    }

    callEvent(event: string, ...args: any[]) {
        if (!this.eventListeners.has(event)) return;
        this.eventListeners.get(event)?.forEach(callback => callback(...args));
    }

    clearListeners() {
        this.eventListeners.clear();
    }

    addEventListener(event: string, callback: Function) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }

        this.eventListeners.get(event)?.push(callback);
    }

    fetch() {
        scene.markers = [];
        const promise = cmd.Execute(cmd.Command.GET, ['Scene', 'Markers']);
        promise.then(markers => {
            markers.forEach((marker: any) => {
                scene.addMarker(FBTypes.Marker.FromJson(marker), true);
            });
        });
    }

    addMarker(marker: FBTypes.Marker, comesfromSave=false) {
        if (!marker) {
            let markerId = 0;
            while (this.markers.find(marker => marker.id === markerId))
                markerId++;
            marker = FBTypes.Marker.FromJson({id: markerId});
        }

        let promise = new Promise((resolve, reject) => resolve(true));
        if (!comesfromSave)
            promise = cmd.Execute(cmd.Command.ADD, ['Scene', 'Marker'], marker.id, marker.pose.toJson());

        promise.then(() => {
            this.markers.push(marker);
            this.callEvent("markerAdd", marker, comesfromSave);
        });
    }

    removeMarker(id: number) {
        const markerIndex = this.markers.findIndex(marker => marker.id === id);
        if (markerIndex < 0) return;

        const promise = cmd.Execute(cmd.Command.REM, ['Scene', 'Marker'], markerIndex);
        promise.then(() => {
            this.markers = this.markers.filter(marker => marker.id !== id);
            this.callEvent("markerRemove", id);
        });
    }

    getMarker(id: number) {
        return this.markers.find(marker => marker.id === id);
    }

    setMarkerId(id: number, newId: number) {
        const markerIndex = this.markers.findIndex(marker => marker.id === id);
        if (markerIndex < 0) return;
        const marker = this.markers[markerIndex];

        // skip already used ids
        const diff = newId - id > 0 ? 1 : -1;
        while (this.markers.find(marker => marker.id === newId)) {
            newId += diff;
            if (newId < 0) // if newId is negative, set it to max id + 1
                newId = this.markers.reduce((max, mrk) => Math.max(max, mrk.id), 0) + 1;
        }

        marker.id = newId;
        const promise = cmd.Execute(cmd.Command.SET, ['Scene', 'Marker'], markerIndex, newId, undefined);
        promise.then(() => {
            this.callEvent("markerIDUpdate", {
                oldId: id,
                newId
            });
        });
    }

    setMarkerPos(id: number, position: any) {
        const markerIndex = this.markers.findIndex(marker => marker.id === id);
        if (markerIndex < 0) return;
        const marker = this.markers[markerIndex];

        marker.pose.position = FBTypes.Vec3.FromJson(position);
        const promise = cmd.Execute(cmd.Command.SET, ['Scene', 'Marker'], markerIndex, undefined, marker.pose.toJson());
        promise.then(() => {
            this.callEvent("markerPoseUpdate", marker);
        });
    }

    setMarkerRot(id: number, rotation: any) {
        const markerIndex = this.markers.findIndex(marker => marker.id === id);
        if (markerIndex < 0) return;
        const marker = this.markers[markerIndex];

        marker.pose.rotation = FBTypes.Quaternion.FromJson(rotation);
        const promise = cmd.Execute(cmd.Command.SET, ['Scene', 'Marker'], markerIndex, undefined, marker.pose.toJson());
        promise.then(() => {
            this.callEvent("markerPoseUpdate", marker);
        });
    }
}

const scene = new Scene();
export default scene;
