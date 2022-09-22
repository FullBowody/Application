interface ServerRouteCallback {
    (ev: Electron.IpcMainInvokeEvent, data: any) : any;
}

interface ForeachCallback {
    (route: Route) : void;
}

class Route {
    static ROUTE_PREFIX = "custom/";

    route:string = "";
    ipcMain:Electron.IpcMain|undefined = undefined;
    ipcRenderer:Electron.IpcRenderer|undefined = undefined;
    
    serverCallback:ServerRouteCallback|undefined = undefined;

    #setup_server_callback() {
        if (this.ipcMain == undefined || this.serverCallback == undefined) return;
        this.ipcMain.handle(Route.ROUTE_PREFIX+this.route, (ev, args) => {
            if (this.serverCallback == undefined) return;
            let res:any = this.serverCallback(ev, args);
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
        return this.ipcRenderer.invoke(Route.ROUTE_PREFIX+this.route, args);
    }
}


const routes = {
    getExtensions: new Route("getExtensions"),
    startExtensionServer: new Route("startExtensionServer"),
    stopExtensionServer: new Route("stopExtensionServer"),
    disconnectExtension: new Route("disconnectExtension"),
    getExtensionServerInfos: new Route("getExtensionServerInfos"),
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