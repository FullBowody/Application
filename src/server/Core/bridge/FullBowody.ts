import ExtensionsServer from "./Extensions";

class FullBowody {
    static ExtensionsServer = ExtensionsServer;
}

if (ExtensionsServer.getState() != 2)
    ExtensionsServer.start();

export default FullBowody;