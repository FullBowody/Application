import * as Routes from "./Routes";

class Router {
    static routes = Routes.routes;

    static executeRoute(route, data) {
        return route.invoke(ipc, data);
    }
}

window.Router = Router; // debug
export default Router;