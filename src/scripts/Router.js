import * as Routes from "./Routes";

class Router {
    static routes = Routes.routes;

    static setup() {
        Router.routes.forEach(route => {
            route.setupClient(ipc);
        });
    }
}

Router.setup();

window.Router = Router; // debug
export default Router;