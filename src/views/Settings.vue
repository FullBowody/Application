<template>
    <div class="flex grow flex-col min-h-0 overflow-auto bg-slate-700 space-y-4">
        <div v-for="zone in settings">
            <bar-title class="mt-2"> {{ zone.title }} </bar-title>
            <div class="flex flex-col ml-2">
                <div v-for="setting in zone.items">
                    <checkbox  
                        v-if="setting.type == 'checkbox'" 
                        :value="setting.default_value"
                        :onchange="setting.onchange"
                        :init="(obj) => {setting.el = obj;}"
                    > {{ setting.label }} </checkbox>

                    <choicebox 
                        v-if="setting.type == 'choicebox'"
                        :state="setting.default_value"
                        :onchange="setting.onchange"
                        :init="(obj) => {setting.el = obj;}"
                        :items="setting.items"
                    > {{ setting.label }} </choicebox>

                    <valuebox  
                        v-if="setting.type == 'valuebox'" 
                        :value="setting.default_value"
                        :onchange="setting.onchange"
                        :init="(obj) => {setting.el = obj;}"
                    > {{ setting.label }} </valuebox>
                </div>
            </div>
        </div>
    </div>
    <div class="flex h-fit w-full">
        <div ref="validate-popup" class="validate-popup mx-auto w-fit transition-all">
            <div class="flex flex-row rounded-lg shadow-xl bg-slate-800 h-fit w-fit p-2 space-x-5">
                <div class="flex flex-col justify-center">
                    <h3 class="whitespace-nowrap text-slate-300 font-bold px-2"> Settings modification detected : </h3>
                </div>
                <div class="flex flex-row space-x-2">
                    <text-button :onclick="hideSavePopup"> Cancel </text-button>
                    <flat-button :onclick="saveSettings"> Save </flat-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarTitle from '../components/BarTitle.vue';
import Checkbox from '../components/Checkbox.vue';
import Valuebox from '../components/Valuebox.vue';
import Choicebox from '../components/Choicebox.vue';

import FlatButton from '../components/FlatButton.vue';
import TextButton from '../components/TextButton.vue';
import Router from '@/scripts/Router';

const settings = [
    {
        title: "Application",
        items: [
            {
                type: "checkbox",
                default_value: Router.routes.settings_getKeepRunningClosed.send(),
                label: "Keep running with windows closed (system tray)",
                onchange: (val) => { Router.routes.settings_setKeepRunningClosed.send(val); }
            },
            {
                type: "valuebox",
                default_value: Router.routes.settings_getEngineRefreshRate.send(),
                label: "Engine refresh rate (update per second)",
                onchange: (val) => { Router.routes.settings_setEngineRefreshRate.send(val); }
            }
        ]
    },
    {
        title: "User interface",
        items: [
            {
                type: "checkbox",
                default_value: true,
                label: "Rotate camera in 3D preview",
                onchange: (val) => {  }
            }
        ]
    },
    {
        title: "Cameras",
        items: [
            {
                type: "valuebox",
                default_value: 30,
                label: "Capture refresh rate (update per second)",
                onchange: (val) => {  }
            }
        ]
    },
    {
        title: "Tracking",
        items: [
            {
                type: "checkbox",
                default_value: true,
                label: "Smooth tracking",
                onchange: (val) => {  }
            },
            {
                type: "valuebox",
                default_value: 30,
                label: "Tracking refresh rate (update per second)",
                onchange: (val) => {  }
            },
            {
                type: "choicebox",
                default_value: 0,
                items: [{ label: "Intersections", value: 0 }, { label: "AI Z Guess", value: 1 }, { label: "Combine", value: 2 }],
                label: "Body tracking method",
                onchange: (val) => {  }
            }
        ]
    }
];

let page = null;

function showSavePopup() {
    /**@type {HTMLDivElement} */
    const popup = page.$refs["validate-popup"];
    popup.style.marginBottom = "1em";
    popup.style.pointerEvents = "all";
}

function hideSavePopup() {
    /**@type {HTMLDivElement} */
    const popup = page.$refs["validate-popup"];
    popup.style.marginBottom = "-8%";
    popup.style.pointerEvents = "none";

    // cancel button pressed, so go back to default settings
    for (let categ of settings) {
        for(let item of categ.items) {
            if (item.value != undefined) {
                if (item.value != item.default_value) {
                    item.value == item.default_value;
                    item.el.setValue(item.default_value);
                }
            }
        }
    }
}

function checkForChanges() {
    let hasChanges = false;
    for (let categ of settings) {
        for(let item of categ.items) {
            if (item.value != undefined) {
                if (item.value != item.default_value) {
                    hasChanges = true;
                    break;
                }
            }
        }
    }
    if (hasChanges) showSavePopup();
    else hideSavePopup();
}

function saveSettings() {
    for (let categ of settings) {
        for(let item of categ.items) {
            if (item.value != undefined) {
                item.default_value = item.value;
                item.callback(item.value);
            }
        }
    }
    checkForChanges();
}

export default {
    name: "Settings",
    components: {
        BarTitle,
        Checkbox,
        Valuebox,
        Choicebox,
        FlatButton,
        TextButton
    },
    data() {
        for (let categ of settings) {
            for(let item of categ.items) {
                if (item.onchange != undefined) {
                    item.callback = item.onchange;
                    item.onchange = (val) => {
                        item.value = val;
                        checkForChanges();
                    };
                }
                const type = typeof(item.default_value);
                if (type != "boolean" && type != "number" && type != "string") {
                    if (item.default_value.then != undefined && typeof(item.default_value.then) == "function") {
                        item.default_value.then((val) => {
                            item.default_value = val;
                        });
                    }
                }
            }
        }
        page = this;
        return { settings, console }
    },
    methods: { showSavePopup, hideSavePopup, saveSettings },
    setup() {},
    mounted() {
        
    }
}
</script>

<style scoped>
.validate-popup {
    margin-bottom: -8%;
    pointer-events: none;
    transition: all 1s cubic-bezier(0.8, -0.5, 0.2, 1.5);
}
</style>