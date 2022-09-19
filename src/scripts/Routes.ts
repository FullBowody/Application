interface RouteCallback {
    (ev: object, data: object) : void;
}
interface ForeachCallback {
    (route: Route) : void;
}

class Route {
    callback:RouteCallback = (ev, data) => {};
    route:string = "";
    ipc:any = undefined;

    constructor(route:string) {
        this.route = route;
    }

    setCallback(callback:RouteCallback) {
        this.callback = callback;
        if (this.ipc != undefined)
            this.setup(this.ipc);
    }

    setup(ipc:any) {
        if (this.callback != undefined)
            ipc.handle(this.route, this.callback);
        this.ipc = ipc;
    }

    /**
     * Invoke route
     * @param {*} ipc ipc used to send the call
     * @param {*} args arguments to send in the call
     * @returns {Promise} promise with the result of the call
     */
    invoke(ipc:any, args:object) {
        return ipc.invoke(this.route, args);
    }
}


const routes = {
    getExtensions: new Route("custom/getExtensions"),
    disconnectExtension: new Route("custom/disconnectExtension"),
    getExtensionServerState: new Route("custom/getExtensionServerState"),
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