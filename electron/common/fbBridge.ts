export class Vec3 {
    static FromJson(json) {
        return new Vec3(
            json?.x ?? 0,
            json?.y ?? 0,
            json?.z ?? 0
        );
    }
    
    static FromFB(fbVec3) {
        if (!fbVec3) return null;
        return new Vec3(
            fbVec3.getX(),
            fbVec3.getY(),
            fbVec3.getZ()
        );
    }

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }

    toFB(addon) {
        return new addon.Vec3(this.x, this.y, this.z);
    }
}

export class Quaternion {
    static FromJson(json) {
        return new Quaternion(
            json?.x ?? 0,
            json?.y ?? 0,
            json?.z ?? 0,
            json?.w ?? 1
        );
    }

    static FromFB(fbQuaternion) {
        if (!fbQuaternion) return null;
        return new Quaternion(
            fbQuaternion.getX(),
            fbQuaternion.getY(),
            fbQuaternion.getZ(),
            fbQuaternion.getW()
        );
    }

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        };
    }

    toFB(addon) {
        return new addon.Quaternion(this.x, this.y, this.z, this.w);
    }
}

export class Pose {
    static FromJson(json) {
        return new Pose(
            Vec3.FromJson(json?.position),
            Quaternion.FromJson(json?.rotation)
        );
    }

    static FromFB(fbPose) {
        if (!fbPose) return null;
        return new Pose(
            Vec3.FromFB(fbPose.getPosition()),
            Quaternion.FromFB(fbPose.getRotation())
        );
    }

    public position: Vec3;
    public rotation: Quaternion;

    constructor(position: Vec3 = new Vec3(), rotation: Quaternion = new Quaternion()) {
        this.position = position;
        this.rotation = rotation;
    }

    toJson() {
        return {
            position: this.position.toJson(),
            rotation: this.rotation.toJson()
        };
    }

    toFB(addon) {
        return new addon.Pose(this.position.toFB(addon), this.rotation.toFB(addon));
    }
}

export class Marker {
    static FromJson(json) {
        return new Marker(
            json?.id ?? 0,
            Pose.FromJson(json?.pose)
        );
    }

    static FromFB(fbMarker) {
        if (!fbMarker) return null;
        return new Marker(
            fbMarker.getId(),
            Pose.FromFB(fbMarker.getPose())
        );
    }

    public id: number;
    public pose: Pose;

    constructor(id: number, pose: Pose) {
        this.id = id;
        this.pose = pose;
    }

    toJson() {
        return {
            id: this.id,
            pose: this.pose.toJson()
        };
    }

    toFB(addon) {
        return new addon.Marker(this.id, this.pose.toFB(addon));
    }
}

export class Camera {
    static FromJson(json) {
        return new Camera(
            json?.id ?? 0,
            json?.type ?? "",
            Pose.FromJson(json?.pose)
        );
    }

    static FromFB(fbCamera) {
        if (!fbCamera) return null;
        return new Camera(
            fbCamera.getId(),
            "PluginName", // fbCamera.getType(),
            Pose.FromFB(fbCamera.getPose())
        );
    }

    public id: number;
    public type: string;
    public pose: Pose;

    constructor(id: number, type: string, pose: Pose = new Pose()) {
        this.id = id;
        this.type = type;
        this.pose = pose;
    }

    toJson() {
        return {
            id: this.id,
            type: this.type,
            pose: this.pose.toJson()
        };
    }

    // Should not be able to create a Camera from elsewhere than the engine
    // toFB(addon) {
    //     return new addon.Camera(this.id, this.pose.toFB(addon));
    // }
}

export class Plugin {
    static FromJson(json) {
        return new Plugin(
            json?.id ?? 0,
            json?.type ?? "",
            json?.name ?? "",
            json?.description ?? "",
            json?.author ?? "",
            json?.version ?? ""
        );
    }

    static FromFB(fbPlugin) {
        if (!fbPlugin) return null;
        return new Plugin(
            fbPlugin.getId(),
            fbPlugin.getType(),
            fbPlugin.getName(),
            fbPlugin.getDescription(),
            fbPlugin.getAuthor(),
            fbPlugin.getVersion()
        );
    }

    public id: number;
    public type: string;
    public name: string;
    public description: string;
    public author: string;
    public version: string;

    constructor(id: number, type: string, name: string, description: string, author: string, version: string) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.author = author;
        this.version = version;
    }

    toJson() {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            author: this.author,
            version: this.version
        };
    }
}
