<template>
    <div class="flex grow flex-row min-h-0 bg-slate-700">
        <div class="flex flex-col w-[50%] min-w-0 min-h-0">
            <h2 class="text-xl text-slate-300 text-center mx-auto mt-2 border-b-2 border-slate-500"> Cameras </h2>
            <div class="flex min-h-0 grow flex-col overflow-auto">
                <div class="flex flex-col">
                    <camera v-for="cam in cameras" :id="cam" :onCreate="(obj) => {camerasObjs[cam] = obj}" :onDelete="() => {deleteCam(cam)}"></camera>
                </div>
                <div class="mx-auto mt-4 px-4">
                    <flat-button :onclick="addCamera">New camera</flat-button>
                </div>
            </div>
        </div>
        <div class="flex w-[2px] bg-slate-600 rounded-lg my-4"></div>
        <div class="flex flex-col w-[50%] min-w-0 min-h-0">
            <h2 class="text-xl text-slate-300 text-center mx-auto mt-2 border-b-2 border-slate-500"> Preview </h2>
            <preview></preview>
            <div class="h-0 w-full">
                <div class="absolute h-10 bottom-8 right-0 w-[50%]">
                    <div class="relative flex mx-auto w-fit h-fit">
                        <div class="bg-slate-700 border border-2 rounded-lg shadow-xl border-slate-500 px-4 py-2 cursor-pointer text-slate-300 hover:border-blue-500 hover:text-slate-100 transition-all">
                            <p class="text-xl font-bold"> Start tracking </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Preview from './Preview.vue';
import Camera from './Camera.vue';
import FlatButton from '../components/FlatButton.vue';
import Router from '../scripts/Router.js';

const camerasObjs = [];
const cameras = [];

let page = null;

function updateCameras() {
    Router.routes.getCameras.send().then(res => {
        const json = JSON.parse(res);
        cameras.splice(0, cameras.length);
        json.forEach(camera => { cameras.push(camera); });
        if (page != null) page.$forceUpdate();
    }).catch(console.error);
}

function setup() {
    updateCameras();
}

function addCamera() {
    Router.routes.addCamera.send().then(res => {
        updateCameras();
    }).catch(console.error);
}

function deleteCam(id) {
    Router.routes.removeCamera.send({id: id}).then(res => {
        updateCameras();
    }).catch(err => {
        camerasObjs[id].showError(err);
    });
}

export default {
    name: "Tracking",
    components: {
        Preview,
        Camera,
        FlatButton
    },
    methods: { addCamera, deleteCam },
    data() { return { cameras, camerasObjs } },
    setup() {},
    mounted() {
        page = this;
        setup();
    }
}
</script>