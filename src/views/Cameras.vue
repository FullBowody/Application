<template>
    <div class="flex grow min-w-0 max-w-full p-4">
        <div class="flex flex-col grow min-w-[25em] space-y-4">
            <p class="w-full text-center text-2xl font-semibold">
                <get-text :context="Lang.CreateTranslationContext('cameras', 'Cameras')" />
            </p>
            <div class="overflow-x-hidden overflow-y-auto">
                <div class="flex flex-col items-center space-y-4">
                    <button
                        @click="selectedCamera = camera"
                        v-for="(camera, index) in cameras"
                        :key="index"
                        class="max-w-full w-[30em]"
                    >
                        <comp-card
                            class="p-2 transition-all"
                            :class="selectedCamera == camera ? 'border-sky-500 dark:border-sky-500' : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 hover:dark:border-slate-500'"
                        >

                        </comp-card>
                    </button>
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
            :class="selectedCamera ? 'w-[100%]' : 'w-[0%]'"
        >
            <span class="h-full w-1 rounded-xl bg-slate-200 dark:bg-slate-600 mx-4" />
            <div class="flex grow">
                <div class="flex grow h-fit">
                    <p class="w-full text-center text-2xl font-semibold">
                        <get-text :context="Lang.CreateTranslationContext('cameras', 'Settings')" />
                    </p>
                    <button
                        class="flex justify-center items-center rounded-md p-1 transition-all hover:bg-slate-200 dark:hover:bg-slate-600"
                        @click="selectedCamera = null"
                    >
                        <x-mark-icon class="w-6"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import CompCard from '@/components/cards/CompCard.vue';
import Lang from '@/scripts/Lang';

import {
    XMarkIcon
} from '@heroicons/vue/24/outline';

class Camera {

};

export default {
    name: "Cameras",
    components: {
        GetText,
        CompCard,
        CompBtnblock,
        XMarkIcon
    },
    data() {
        return {
            Lang,
            cameras: [new Camera()],
            selectedCamera: null
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