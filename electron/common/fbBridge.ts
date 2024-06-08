export class Vec3 {
    static FromJson(json) {
        return new Vec3(
            json?.x ?? 0,
            json?.y ?? 0,
            json?.z ?? 0
        );
    }
    
    static FromFB(fbVec3) {
        return new Vec3(
            fbVec3.getX(),
            fbVec3.getY(),
            fbVec3.getZ()
        );
    }

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
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

    constructor(x: number, y: number, z: number, w: number) {
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
        return new Pose(
            Vec3.FromFB(fbPose.getPosition()),
            Quaternion.FromFB(fbPose.getRotation())
        );
    }

    public position: Vec3;
    public rotation: Quaternion;

    constructor(position: Vec3, rotation: Quaternion) {
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