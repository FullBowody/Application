export enum PluginType {
    CAMERA = "camera",
    UNKNOWN = "unknown"
}

export class Plugin {
    public type: PluginType;
    public name: string;
    public description: string;
    public author: string;
    public version: string;

    constructor(type: PluginType, name: string, description: string, author: string, version: string) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.author = author;
        this.version = version;
    }

    public static FromJson(json: any): Plugin {
        return new Plugin(json.type, json.name, json.description, json.author, json.version);
    }

    public toJson(): any {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            author: this.author,
            version: this.version
        };
    }
}