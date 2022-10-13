<template>
    <div class="flex grow-0 h-min flex-col rounded-lg border border-2 border-slate-600 shadow-md m-4">
        <div class="flex flex-row justify-between ml-2 mt-1 mr-1 mb-1">
            <h3 class="font-semibold text-slate-400 m-0 p-0">Camera {{ index }}</h3>
            <div ref="err" class="border-2 border-red-500/[0.5] bg-red-500/[0.2] rounded-lg px-2 overflow-hidden transition-all" style="height: 0; opacity: 0;">
                <p class="text-red-500 font-semibold"> Error </p>
            </div>
            <div v-on:click="onDelete" class="flex flex-col justify-center cursor-pointer text-red-500/[0.9] hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        <div class="flex grow min-h-0 h-min max-h-fit flex-row pb-2 px-1">
            <div class="flex grow max-h-full w-[50%] px-1">
                <div class="flex grow flex-col justify-center bg-black/[0.1] rounded-lg p-2">
                    <img class="object-contain max-h-full" :src="src"/>
                </div>
            </div>
            <div class="flex w-[2px] bg-slate-600 rounded-lg"></div>
            <div class="min-h-[4em] h-full w-[50%]">
                <bar-title class="mb-2">Camera</bar-title>
                <select ref="device" name="cam-name" id="cam-name" class="flex w-fit max-w-full px-2 py-1 bg-slate-600 text-slate-100 mx-auto outline-none">
                    <option value="<loading>"> Loading ... </option>
                </select>
                <div class="flex flex-row justify-evenly mt-2">
                    <flat-button ref="start-btn" class="w-full mx-1" :onclick="() => startCamera(this)"> Start </flat-button>
                    <flat-button ref="stop-btn" class="w-full mx-1" :onclick="() => stopCamera(this)"> Stop </flat-button>
                </div>
                <bar-title class="mt-4 mb-2">Calibration</bar-title>
                <p class="text-slate-300 ml-2">Calibration used : <span class="text-slate-100 bg-slate-600 py-0.5 px-2 rounded-md">default</span></p>
                <flat-button class="flex grow mx-1 mt-2"> Calibrate camera </flat-button>
                <div class="flex flex-row justify-evenly mt-2">
                    <flat-button class="w-full mx-1"> Save </flat-button>
                    <flat-button class="w-full mx-1"> Load </flat-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarTitle from '../components/BarTitle.vue';
import FlatButton from '../components/FlatButton.vue';
import Router from '../scripts/Router.js';
import { STATE } from '../scripts/common.js';

const devices = [{id: -1, name: "Loading ..."}];
const toUpdate = [];
let loadingDevices = false;

let index = 0;

function displayError(obj, msg) {
    /** @type {HTMLDivElement} */
    const err = obj.$refs["err"];
    err.firstElementChild.innerHTML = msg;
    err.style.opacity = "1";
    err.style.height = (err.firstElementChild.getBoundingClientRect().height+4) + "px";
    setTimeout(() => {
        err.style.opacity = "0";
        err.style.height = "0px";
    }, 2000);
}

function startPreview(obj) {
    obj.$refs["start-btn"].setEnabled(false);
    obj.$refs["stop-btn"].setEnabled(true);
    obj.shouldPreview = true;
    loadPreview(obj);
}

function loadPreview(obj) {
    if (obj.shouldPreview == false) {
        obj.src = "";
        obj.$forceUpdate();
        return;
    }
    Router.routes.getCameraData.send({id: obj.id}).then(data => {
        obj.src = "data:image/png;base64," + data;
        obj.$forceUpdate();
        loadPreview(obj);
    }).catch( err => displayError(obj, err) );
}

function stopPreview(obj) {
    obj.$refs["stop-btn"].setEnabled(false);
    obj.$refs["start-btn"].setEnabled(true);
    obj.shouldPreview = false;
}

function startCamera(obj) {
    obj.$refs["start-btn"].setEnabled(false);
    Router.routes.startCamera.send({id: obj.id}).then((res) => {
        obj.$refs["stop-btn"].setEnabled(true);
        startPreview(obj);
    }).catch( err => displayError(obj, err) );
}

function stopCamera(obj) {
    obj.$refs["stop-btn"].setEnabled(false);
    stopPreview(obj);
    Router.routes.stopCamera.send({id: obj.id}).then((res) => {
        obj.$refs["start-btn"].setEnabled(true);
    }).catch( err => displayError(obj, err) );
}

function updateCamera(obj) {
    Router.routes.getCamera.send({id: obj.id}).then(res => {
        res = JSON.parse(res);
        obj.input = res.input;
        obj.name = res.name;
        obj.state = res.state;

        if (obj.state == STATE.STATE_STARTED)
            startPreview(obj);
        else stopPreview(obj);

        /** @type {HTMLInputElement} */
        const deviceInput = obj.$refs["device"];
        while (deviceInput.firstChild) deviceInput.firstChild.remove();
        devices.forEach((device, i) => {
            const opt = document.createElement("option");
            opt.value = device.id;
            opt.innerText = device.name;
            deviceInput.appendChild(opt);
        });
        deviceInput.value = obj.input;
        obj.$forceUpdate();
    });
}

function setupCamera(obj) {
    updateCamera(obj);
    obj.$forceUpdate();
    
    obj.$refs["device"]?.addEventListener("change", ev => {
        if (ev.target.value == -1) {
            setTimeout(() => {
                ev.target.value = obj.input;
            }, 100);
            return;
        }
        Router.routes.setCameraInput.send({id: obj.id, input: ev.target.value}).then(res => {
            obj.input = ev.target.value;
        }).catch(err => {
            ev.target.value = obj.input;
            displayError(obj, err);
        });
    });
}

function setup(obj) {
    if (!loadingDevices) {
        loadingDevices = true;
        Router.routes.getDevices.send().then(res => {
            const json = JSON.parse(res);
            devices.splice(0, devices.length);
            if (json.length > 0)
                for (let i = 0; i < json.length; i++)
                    devices.push({id: json[i].id, name: json[i].name});
            else devices.push({id: -1, name: "No camera found"});

            toUpdate.forEach(callback => callback());
        }).catch(err => {
            console.error(err);
            devices.splice(0, devices.length);
            devices.push({id: -1, name: "Error finding cameras"});
            displayError(obj, err);
        }).finally(() => { loadingDevices = false; });
    }
    toUpdate.push(() => setupCamera(obj));
}


export default {
    name: "Camera",
    components: { BarTitle, FlatButton },
    data() { return { devices, index: ++index, src: "" } },
    props: {
        id: { type: Number, required: true },
        onDelete: { type: Function, required: false },
        onCreate: { type: Function, required: false }
    },
    methods: { startCamera, stopCamera },
    setup() {},
    mounted() {
        setup(this);
        this.onCreate?.(this);
        this.showError = msg => displayError(this, msg);
    }
}
</script>