/**
 * @callback RouteCallback
 * @param {object} ev call event
 * @param {any} data call data
 */

class Route {
    /**
     * Route constructor
     * @param {string} route Route's path
     * @param {RouteCallback} callback server callback to execute for this route
     */
    constructor(route) {
        this.route = route;
    }

    setCallback(callback) {
        this.callback = callback;
        if (this.ipc != undefined)
            this.setup(this.ipc);
    }

    setup(ipc) {
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
    invoke(ipc, args) {
        return ipc.invoke(this.route, args);
    }
}


const routes = {
    getExtensions: new Route("custom/getExtensions"),
    disconnectExtension: new Route("custom/disconnectExtension"),
    getExtensionServerState: new Route("custom/getExtensionServerState")
};


routes.forEach = (callback) => {
    const keysVal = Object.keys(routes).map(v => ({key: v, value: routes[v]}));
    keysVal.forEach((v, i) => {
        if (v.key === "forEach") return;
        callback(v, i);
    });
}

export { Route, routes };