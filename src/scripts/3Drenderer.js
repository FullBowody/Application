import * as THREE from 'three';
import { getSetting } from '@/scripts/settings';
import { getArucoImage, ArucoDictName } from '@/scripts/aruco';

let camera, scene, renderer;
let cameraSpeed = 0, cameraDistance = 4, camRotX = 0.78, camRotY = 0.78;
let lastTime = 0;

let trackers = [];
// let cameras = [];

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
    const canvas = document.getElementById('3Dview');
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

    camera.up.set(0,0,1);
    
    const axis = createAxis(1);
    axis.position.set(0, 0.001, 0)
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
    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            camRotX += e.movementY * 0.005;
            camRotY -= e.movementX * 0.005;
        }
    });
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
    scene.addEventListener('update', onSceneUpdate);
}

function onSceneUpdate(sceneObj) {
    trackers = sceneObj.trackers;
    
    // add plane representing trackers
    scene.children = scene.children.filter(child => child.userData?.type !== 'tracker');
    trackers.forEach(async tracker => {
        const arucoImage = await getArucoImage(256, 0.1, ArucoDictName.DICT_4X4, tracker.id);
        const arucoTexture = new THREE.CanvasTexture(arucoImage);
        arucoTexture.magFilter = THREE.NearestFilter;

        const markerFront = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.5),
            new THREE.MeshBasicMaterial({map: arucoTexture})
        );
        const markerBack = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.5),
            new THREE.MeshBasicMaterial({color: 0xffffff})
        );
        markerBack.rotation.y = Math.PI;
        const plane = new THREE.Group();
        plane.add(markerFront);
        plane.add(markerBack);

        plane.position.set(tracker.position.x, tracker.position.y, tracker.position.z);
        plane.userData = {type: 'tracker'};
        scene.add(plane);
    });
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