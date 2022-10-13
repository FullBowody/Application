import { routes } from "../scripts/Routes";
import FullBowody from './Core/bridge/FullBowody';

routes.getDevices.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.GetDevices()
        .then(resolve)
        .catch(reject);
    });
});

routes.getCameras.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.GetCameras()
        .then(resolve)
        .catch(reject);
    });
});

routes.getCamera.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.GetCamera(data.id)
        .then(resolve)
        .catch(reject);
    })
})

routes.setCameraInput.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.setCameraInput(data.id, data.input.toString())
        .then(resolve)
        .catch(reject);
    });
});

routes.startCamera.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.StartCamera(data.id)
        .then(resolve)
        .catch(reject);
    });
});

routes.stopCamera.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.StopCamera(data.id)
        .then(resolve)
        .catch(reject);
    });
});

routes.getCameraData.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.GetCameraData(data.id)
        .then(resolve)
        .catch(reject);
    });
});

routes.addCamera.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        FullBowody.CameraManager.AddCamera()
        .then(resolve)
        .catch(reject);
    });
});

routes.removeCamera.onRequest((ev, data) => {
    return new Promise((resolve, reject) => {
        resolve(FullBowody.CameraManager.RemoveCamera(data.id));
    });
});