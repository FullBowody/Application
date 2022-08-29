<template>
    <div class="flex w-full h-full min-h-0 min-w-0 overflow-hidden" id="container">
        <canvas id="preview"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';

/**@type {THREE.Scene} */
let scene;
/**@type {THREE.Camera} */
let camera;
/**@type {THREE.Renderer} */
let renderer;
let rotation = 0;

function loop(time) {
    rotation = time / 4000;
    camera.position.set(Math.sin(rotation) * 4, 3, Math.cos(rotation) * 4);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}

function init() {
    const container = document.getElementById("container");
    const canvas = container.firstElementChild;
    let rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    window.addEventListener('resize', () => {
        rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.width, canvas.height);
    });

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);

    const axe_red_x = new THREE.Mesh(new THREE.BoxGeometry(1, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    const axe_green_y = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1, 0.05), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    const axe_blue_z = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 1), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));

    axe_red_x.position.set(0.5, 0, 0);
    axe_green_y.position.set(0, 0.5, 0);
    axe_blue_z.position.set(0, 0, 0.5);

    scene.add(axe_blue_z, axe_red_x, axe_green_y);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(loop);
}

export default {
    name: "Preview",
    components: {},
    methods: {},
    setup() {},
    mounted() {
        init();
    }
}
</script>