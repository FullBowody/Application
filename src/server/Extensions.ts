import { routes } from "../scripts/Routes";
import FullBowody from './Core/bridge/FullBowody';

routes.startExtensionServer.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.ExtensionsServer.start()
        .then(resolve)
        .catch(reject);
    })
});
routes.stopExtensionServer.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.ExtensionsServer.stop()
        .then(resolve)
        .catch(reject);
    })
});

routes.getExtensionServerInfos.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.ExtensionsServer.getInfos()
        .then(resolve)
        .catch(reject);
    })
});

routes.getExtensions.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.ExtensionsServer.getExtensions().then((exts:any|null) => {
            resolve(exts.map((ext:any) => ({
                name: ext.getName(),
                ip: ext.getIp(),
                port: ext.getPort(),
                id: ext.getIp() + ":" + ext.getPort()
            })));
        }).catch(reject);
    });
});