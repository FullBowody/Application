<template>
    <div class="flex grow min-w-0 max-w-full p-4">
        <div class="flex flex-col grow min-w-[25em] space-y-4">
            <p class="w-full text-center text-2xl font-semibold">
                <get-text :context="Lang.CreateTranslationContext('cameras', 'Cameras')" />
            </p>
            <div class="overflow-x-hidden overflow-y-auto">
                <div class="flex flex-col items-center space-y-4">
                    <comp-card
                        v-if="cameras.length === 0"
                        class="p-4 bg-slate-200 dark:bg-slate-600"
                    >
                        <p class="text-center text-lg font-semibold">
                            <get-text :context="Lang.CreateTranslationContext('cameras', 'NoCameras')" />
                        </p>
                        <p class="text-center text-md">
                            <get-text :context="Lang.CreateTranslationContext('cameras', 'NoCamerasDesc')" />
                        </p>
                    </comp-card>

                    <comp-card
                        v-for="(camera, index) in cameras"
                        :key="index"
                        :override-border="true"
                        class="show-down flex flex-col p-4 pb-3 max-w-full w-[30em] space-y-2 transition-all"
                        :class="selectedCamera == camera ? 'border-sky-500 dark:border-sky-700' : 'border-slate-300 dark:border-slate-600'"
                    >
                        <div class="flex flex-col w-full h-fit">
                            <div class="flex w-full h-fit justify-between items-center">
                                <div class="flex text-lg font-semibold w-fit h-fit whitespace-nowrap text-ellipsis overflow-hidden">
                                    <get-text :context="Lang.CreateTranslationContext('cameras', 'Camera')" />
                                    <p class="pl-2"> {{ index + 1 }} </p>
                                </div>
                                <div class="flex w-fit space-x-2">
                                    <button
                                        class="flex justify-center items-center w-fit"
                                        @click="selectedCamera = camera"
                                    >
                                        <cog-6-tooth-icon
                                            class="w-5 cursor-pointer transition-all hover:text-sky-500 dark:hover:text-sky-500"
                                        />
                                    </button>
                                    <button
                                        class="flex justify-center items-center w-fit"
                                        @click="() => { cameras.splice(index, 1); if (selectedCamera == camera) selectedCamera = null; }"
                                    >
                                        <x-mark-icon
                                            class="w-6 cursor-pointer transition-all hover:text-red-500 dark:hover:text-red-500"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div class="flex h-fit w-full max-w-full min-w-0 space-x-2">
                                <div class="flex w-1/2 max-w-full min-w-0">
                                    <input-choice
                                        :label="Lang.CreateTranslationContext('cameras', 'Type')"
                                        :list="cameraTypes"
                                        :onchange="ev => { camera.type = ev.target.value; camera.load(); }"
                                        :value="camera.type"
                                    />
                                </div>
                                <span class="flex w-0.5 rounded-xl bg-slate-500 my-1" />
                                <div class="flex w-1/2 max-w-full min-w-0">
                                    <input-choice
                                        v-if="camera.type == 1"
                                        :label="Lang.CreateTranslationContext('cameras', 'Webcam')"
                                        :list="[
                                            { name: 'HP True vision',     value: 1 }
                                        ]"
                                        :onchange="ev => { camera.webcam = ev.target.value; camera.load(); }"
                                        :value="camera.webcam"
                                    />
                                    <input-text
                                        v-if="camera.type == 2"
                                        :label="Lang.CreateTranslationContext('cameras', 'StreamUrl')"
                                        :value="camera.stream"
                                        :onchange="ev => { camera.stream = ev.target.value; camera.load(); }"
                                    />
                                    <input-text
                                        v-if="camera.type == 3"
                                        :label="Lang.CreateTranslationContext('cameras', 'IPAddr')"
                                        :value="camera.ip"
                                        :onchange="ev => { camera.ip = ev.target.value; camera.load(); }"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex grow space-x-2">
                            <div class="flex flex-col w-1/2">
                                <p class="text-md font-semibold">
                                    <get-text :context="Lang.CreateTranslationContext('cameras', 'Preview')" />
                                </p>
                                <div class="flex grow bg-slate-950/[0.1] rounded-lg min-h-[10em] overflow-hidden">
                                    <div
                                        v-if="camera.loading"
                                        class="flex m-auto"
                                    >
                                        <svg class="animate-spin h-10 w-10 text-slate-500 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                                            <path d="M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"/>
                                        </svg>
                                    </div>
                                    <div
                                        v-else
                                    >
                                        <!-- Camera preview image -->
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-1/2">
                                <p class="text-md font-semibold">
                                    <get-text :context="Lang.CreateTranslationContext('cameras', 'Informations')" />
                                </p>
                                <div class="flex flex-col pl-2 space-y-1 min-w-0 max-w-full">
                                    <div class="flex flex-wrap grow h-fit">
                                        <p class="font-semibold whitespace-nowrap">
                                            <get-text :context="Lang.CreateTranslationContext('cameras', 'Resolution')" />
                                        </p>
                                        <p class="flex mx-auto whitespace-nowrap">
                                            {{ camera.infos.width ?? '---' }} x {{ camera.infos.height ?? '---' }}
                                        </p>
                                    </div>
                                    <div class="flex flex-wrap grow h-fit">
                                        <p class="font-semibold whitespace-nowrap">
                                            <get-text :context="Lang.CreateTranslationContext('cameras', 'Framerate')" />
                                        </p>
                                        <p class="flex mx-auto whitespace-nowrap">
                                            {{ camera.infos.framerate ?? '--' }} fps
                                        </p>
                                    </div>
                                    <div class="flex flex-wrap grow h-fit">
                                        <p class="font-semibold whitespace-nowrap">
                                            <get-text :context="Lang.CreateTranslationContext('cameras', 'Position')" />
                                        </p>
                                        <p class="flex mx-auto whitespace-nowrap">
                                            ({{ camera.infos.position?.x ?? '--' }}; {{ camera.infos.position?.y ?? '--' }}; {{ camera.infos.position?.z ?? '--' }})
                                        </p>
                                    </div>
                                    <div class="flex flex-wrap grow h-fit">
                                        <p class="font-semibold whitespace-nowrap">
                                            <get-text :context="Lang.CreateTranslationContext('cameras', 'Rotation')" />
                                        </p>
                                        <p class="flex mx-auto whitespace-nowrap">
                                            ({{ camera.infos.rotation?.x ?? '--' }}; {{ camera.infos.rotation?.y ?? '--' }}; {{ camera.infos.rotation?.z ?? '--' }})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </comp-card>
                    <div>
                        <comp-btnblock
                            :onclick="addCamera"
                            class="mx-auto"
                        >
                            <get-text :context="Lang.CreateTranslationContext('cameras', 'Add')" />
                        </comp-btnblock>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex transition-all overflow-hidden"
            :class="selectedCamera ? 'w-full' : 'w-0'"
        >
            <span class="h-full w-1 rounded-xl bg-slate-200 dark:bg-slate-600 mx-4" />
            <div class="flex grow flex-col">
                <div class="flex h-min">
                    <p class="w-full text-center text-2xl font-semibold">
                        <get-text :context="Lang.CreateTranslationContext('cameras', 'Settings')" />
                    </p>
                    <button
                        class="flex h-fit justify-center items-center rounded-md p-1 transition-all hover:bg-slate-200 dark:hover:bg-slate-600"
                        @click="selectedCamera = null"
                    >
                        <x-mark-icon class="w-6 h-6"/>
                    </button>
                </div>
                <div class="flex grow">
                    <!-- settings content -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import CompCard from '@/components/cards/CompCard.vue';
import InputChoice from '@/components/inputs/InputChoice.vue';
import InputText from '@/components/inputs/InputText.vue';
import Lang from '@/scripts/Lang';

import {
    XMarkIcon,
    Cog6ToothIcon
} from '@heroicons/vue/24/outline';

const cameraTypes = [
    { context: Lang.CreateTranslationContext('cameras', 'Webcam'),     value: 1 },
    { context: Lang.CreateTranslationContext('cameras', 'WebStream'), value: 2 },
    { context: Lang.CreateTranslationContext('cameras', 'FullBowody'), value: 3 }
];

class Camera {
    type = -1;
    webcam = -1;
    stream = '';
    ip = '';
    loading = false;
    infos = {};

    load() {
        this.loading = true;
        this.infos = {};
        setTimeout(() => {
            this.infos = {
                width: '1920',
                height: '1080',
                framerate: '60',
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0}
            };
            this.loading = false;
        }, 500);
    }
};

export default {
    name: "Cameras",
    components: {
        GetText,
        CompCard,
        CompBtnblock,
        XMarkIcon,
        Cog6ToothIcon,
        InputChoice,
        InputText
    },
    data() {
        return {
            Lang,
            cameraTypes,
            cameras: [],
            selectedCamera: null,
            console
        }
    },
    mounted() {
        
    },
    methods: {
        addCamera() {
            this.cameras.push(new Camera());
        }
    }
}
</script>