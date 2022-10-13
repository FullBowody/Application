interface ServerRouteCallback {
    (ev: Electron.IpcMainInvokeEvent, data: any) : any;
}

interface ForeachCallback {
    (route: Route) : void;
}

const debug = false;

class Route {
    static ROUTE_PREFIX = "custom/";

    route:string = "";
    ipcMain:Electron.IpcMain|undefined = undefined;
    ipcRenderer:Electron.IpcRenderer|undefined = undefined;
    
    serverCallback:ServerRouteCallback|undefined = undefined;

    #setup_server_callback() {
        if (this.ipcMain == undefined || this.serverCallback == undefined) return;
        this.ipcMain.handle(Route.ROUTE_PREFIX+this.route, (ev, args) => {
            if (debug) console.log("Handling route ["+this.route+"] with args: ", args);
            if (this.serverCallback == undefined) return;
            let res:any = this.serverCallback(ev, args);
            if (debug) console.log("Handled route ["+this.route+"] with result: ", res.length > 50 ? res.substring(0, 50)+"..." : res);
            return res;
        });
    }

    constructor(route:string) {
        this.route = route;
    }

    setupClient(ipc:Electron.IpcRenderer) {
        this.ipcRenderer = ipc;
    }

    setupServer(ipc:Electron.IpcMain) {
        this.ipcMain = ipc;
        this.#setup_server_callback();
    }

    onRequest(callback:ServerRouteCallback) {
        this.serverCallback = callback;
        this.#setup_server_callback();
    }

    send(args:any) {
        if (this.ipcRenderer == undefined) return;
        if (debug) console.log("Sending route ["+this.route+"] with args: ", args);
        return new Promise((resolve, reject) => {
            this.ipcRenderer?.invoke(Route.ROUTE_PREFIX+this.route, args).then((res:any) => {
                if (debug) console.log("Resolving route ["+this.route+"] with result: ", res.length > 50 ? res.substring(0, 50)+"..." : res);
                resolve(res);
            }).catch((err:any) => {
                if (debug) console.error("Rejecting route ["+this.route+"] with error: ", err);
                const error:string = err.toString();
                reject(error.substring(err.toString().indexOf(this.route)+this.route.length+3));
            })
        });
    }
}

const routes = {
    settings_setKeepRunningClosed: new Route("setKeepRunningClosed"),
    settings_getKeepRunningClosed: new Route("getKeepRunningClosed"),
    settings_setEngineRefreshRate: new Route("setEngineRefreshRate"),
    settings_getEngineRefreshRate: new Route("getEngineRefreshRate"),

    getExtensions: new Route("getExtensions"),
    startExtensionServer: new Route("startExtensionServer"),
    stopExtensionServer: new Route("stopExtensionServer"),
    getExtensionServerInfos: new Route("getExtensionServerInfos"),

    getDevices: new Route("getDevices"),
    getCameras: new Route("getCameras"),
    getCamera: new Route("getCamera"),
    setCameraInput: new Route("setCameraInput"),
    startCamera: new Route("startCamera"),
    stopCamera: new Route("stopCamera"),
    getCameraData: new Route("getCameraData"),
    addCamera: new Route("addCamera"),
    removeCamera: new Route("removeCamera"),

    forEach: (callback:ForeachCallback) => {
        const keysVal:{key:string, value:Route}[] = [];
        let key:keyof typeof routes;
        for (key in routes) {
            if (key != "forEach") keysVal.push({key: key, value: routes[key]})
        }
        keysVal.forEach((v, i) => {
            if (v.key === "forEach") return;
            callback(v.value);
        });
    }
};

export { Route, routes }