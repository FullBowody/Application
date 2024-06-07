import * as THREE from 'three';
import { getSetting } from '@/scripts/settings';
import { getArucoImage, ArucoDictName } from '@/scripts/aruco';

let canvas;
let camera, scene, renderer, raycaster, rayTargeted;
let cameraSpeed = 0, cameraDistance = 4, camRotX = 0.78, camRotY = 0.78;
let lastTime = 0;

export function createLine(p1, p2, color) {
    const points = [];
    points.push(new THREE.Vector3(p1.x, p1.y, p1.z));
    points.push(new THREE.Vector3(p2.x, p2.y, p2.z));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color});
    return new THREE.Line(geometry, material);
}

export function createAxis(size) {
    const group = new THREE.Group();
    group.add(createLine({x: 0, y: 0, z: 0.01}, {x: size, y: 0, z: 0.01}, 0xff0000));
    group.add(createLine({x: 0, y: 0, z: 0.01}, {x: 0, y: size, z: 0.01}, 0x00ff00));
    group.add(createLine({x: 0, y: 0, z: 0.01}, {x: 0, y: 0, z: size}, 0x0000ff));
    return group;
}

export function createLineGround(size, repetitions, color) {
    const group = new THREE.Group();
    const total = size * repetitions / 2 + 1;
    for (let i = -repetitions/2; i <= repetitions/2; i++) {
        group.add(createLine({x: -total, y: i, z: 0}, {x:  total, y: i, z: 0}, color));
        group.add(createLine({x:  i, y: -total, z: 0}, {x:  i, y: total, z: 0}, color));
    }
    return group;
}

export function setup() {
    canvas = document.getElementById('3Dview');
    const dims = canvas.parentElement.getBoundingClientRect();
    renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
    renderer.setSize(dims.width, dims.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener('resize', () => {
        const dims = canvas.parentElement.getBoundingClientRect();
        renderer.setSize(dims.width, dims.height);
        camera.aspect = dims.width / dims.height;
        camera.updateProjectionMatrix();
    });

    const fov = 75;
    const aspect = dims.width / dims.height;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
    rayTargeted = new THREE.Group();

    camera.up.set(0,0,1);
    
    const axis = createAxis(1);
    axis.position.set(0, 0.001, 0)
    scene.add(rayTargeted);
    scene.add(axis);
    scene.add(createLineGround(1, 10, 0x888888));

    cameraSpeed = getSetting('scene.rotateCamera')
        ? (getSetting('scene.cameraSpeed') ?? 10)
        : 0;

    canvas.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            cameraDistance *= 1.1;
        } else {
            cameraDistance /= 1.1;
        }
    });
    canvas.addEventListener('mousemove', ev => {
        if (ev.buttons === 1) {
            camRotX += ev.movementY * 0.005;
            camRotY -= ev.movementX * 0.005;
        }

        const pointerPos = getCanvasMousePos(ev);
        if (getObjectAtScreenPosition(pointerPos.x, pointerPos.y)) {
            if (canvas.style.cursor != 'pointer')
                canvas.style.cursor = 'pointer';
        } else {
            if (canvas.style.cursor == 'pointer')
                canvas.style.cursor = 'grab';
        }
    });

    let downPos = null;
    canvas.addEventListener('mousedown', ev => {
        downPos = getCanvasMousePos(ev);
        if (canvas.style.cursor != 'pointer')
            canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('mouseup', ev => {
        const upPos = getCanvasMousePos(ev);
        if (downPos && Math.abs(downPos.x - upPos.x) < 2 && Math.abs(downPos.y - upPos.y) < 2) {
            onMouseClick(upPos);
        }
        
        if (canvas.style.cursor != 'pointer')
            canvas.style.cursor = 'grab';
    });
}

function getCanvasMousePos(e) {
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top
    };
}

function onMouseClick(pointerPos) {
    let object = getObjectAtScreenPosition(pointerPos.x, pointerPos.y);
    let counter = 5;
    while (object && Object.keys(object.userData).length === 0 && counter > 0) {
        object = object.parent;
    }

    const event = new CustomEvent('objectSelected', {
        detail: object ? object.userData : null
    });
    canvas.dispatchEvent(event);
}

function getObjectAtScreenPosition(x, y) {
    const dims = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = (x / dims.width) * 2 - 1;
    mouse.y = -(y / dims.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(rayTargeted.children, true);
    return intersects.length > 0 ? intersects[0].object : null;
}

let shouldViewRun = false;
export function start() {
    shouldViewRun = true;
    requestAnimationFrame(render);
}

export function stop() {
    shouldViewRun = false;
}

export function attachScene(scene) {
    scene.addEventListener('markerAdd', addSceneMarker);
    scene.addEventListener('markerRemove', removeSceneMarker);
    scene.addEventListener('markerIDUpdate', updateMarkerID);
    scene.addEventListener('markerPoseUpdate', updateMarkerPose);
}

async function arucoTexture(id) {
    const arucoImage = await getArucoImage(256, 0.1, ArucoDictName.DICT_4X4, id);
    const arucoTexture = new THREE.CanvasTexture(arucoImage);
    arucoTexture.magFilter = THREE.NearestFilter;
    return arucoTexture;
}

async function updateMarkerID(infos) {
    const marker = rayTargeted.children.find(child => child.userData?.id === infos.oldId);
    if (marker) {
        marker.userData.id = infos.newId;
        const frontPlane = marker.children[0];
        const texturePromise = arucoTexture(infos.newId);
        texturePromise.then(tex => {
            frontPlane.material.map = tex;
            frontPlane.material.needsUpdate = true;
        });
    }
}

function updateMarkerPose(infos) {
    const marker = rayTargeted.children.find(child => child.userData?.id === infos.id);
    const deg2Rad = Math.PI / 180;
    if (marker) {
        marker.position.set(infos.position.x, infos.position.y, infos.position.z);
        marker.rotation.set(
            infos.rotation.x * deg2Rad, 
            infos.rotation.y * deg2Rad, 
            infos.rotation.z * deg2Rad
        );
    }
}

function removeSceneMarker(id) {
    const marker = rayTargeted.children.find(child => child.userData?.id === id);
    if (marker) {
        rayTargeted.remove(marker);
    }

    canvas.dispatchEvent(new CustomEvent('objectSelected', {
        detail: null
    }));
}

async function addSceneMarker(marker) {
    const frontPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    const backPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    backPlane.rotation.y = Math.PI;
    const markerObj = new THREE.Group();
    markerObj.add(frontPlane);
    markerObj.add(backPlane);
    
    const texturePromise = arucoTexture(marker.id);
    texturePromise.then(tex => {
        frontPlane.material.map = tex;
        frontPlane.material.needsUpdate = true;
    });

    markerObj.position.set(marker.position.x, marker.position.y, marker.position.z);
    markerObj.userData = {type: 'marker', ...marker};
    rayTargeted.add(markerObj);

    canvas.dispatchEvent(new CustomEvent('objectSelected', { detail: markerObj.userData }));
}

function render(time) {
    time *= 0.001;
    const deltaTime = time - lastTime;
    lastTime = time;

    // loop
    camRotY += deltaTime * 0.0174533 * cameraSpeed;

    const shiftX = Math.sin(camRotX) * cameraDistance;
    const shiftZ = Math.cos(camRotX) * cameraDistance;
    camera.position.set(
        Math.cos(camRotY) * shiftZ,
        Math.sin(camRotY) * shiftZ,
        Math.sin(camRotX) * cameraDistance
    )
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    if (shouldViewRun) {
        requestAnimationFrame(render);
    }
}
