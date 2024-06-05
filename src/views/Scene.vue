<template>
    <div class="flex relative grow flex-col min-w-0 max-w-full">
        <!-- [START] 3D VIEW -->
        <div class="flex absolute w-full h-full z-50">
            <div class="flex grow h-full w-full">
                <canvas id="3Dview" class="flex grow" />
            </div>
        </div>
        <!-- [END] 3D VIEW -->

        <!-- [START] FLOATING UI -->
        <div class="flex absolute w-full h-full items-start z-50 pointer-events-none"> <!-- view selector -->
            <div class="mx-auto m-4 pointer-events-auto">
                <comp-vue-selector />
            </div>
        </div>
        <div class="flex absolute w-full h-full items-end z-50 pointer-events-none"> <!-- tracking button -->
            <div class="mx-auto m-4 pointer-events-auto">
                <comp-btnblock
                    class="text-xl"
                    :onclick="toggleTracking"
                    :disabled="trackingState === TRACKING.STARTING || trackingState === TRACKING.STOPPING"
                >
                    <get-text
                        class="p-2"
                        :context="Lang.CreateTranslationContext('scene', trackingState)"
                    />
                </comp-btnblock>
            </div>
        </div>
        <div class="flex absolute w-full h-full items-start z-50 pointer-events-none"> <!-- add dropdown -->
            <div class="mr-auto m-4 pointer-events-auto">
                <input-choice
                    :list="addOptions"
                    :value="'--add'"
                    :onchange="onAdd"
                />
            </div>
        </div>
        <!-- [END] FLOATING UI -->
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import InputChoice from '@/components/inputs/InputChoice.vue';
import CompVueSelector from '@/components/scene/CompVueSelector.vue';
import Lang from '@/scripts/Lang';
import * as renderer from '@/scripts/3Drenderer';
import scene from '@/scripts/scene.ts';

import {
    PlusIcon
} from '@heroicons/vue/24/outline';

const TRACKING = {
    STOPPED: 'StartTracking',
    STARTED: 'StopTracking',
    STARTING: 'StartingTracking',
    STOPPING: 'StoppingTracking'
}

const addOptions = [
    { value: '--add', context: Lang.CreateTranslationContext('verbs', 'Add') },
    { value: 'camera', context: Lang.CreateTranslationContext('scene', 'Camera') },
    { value: 'tracker', context: Lang.CreateTranslationContext('scene', 'Tracker') }
];

export default {
    name: "Tracking",
    components: {
        GetText,
        CompBtnblock,
        CompVueSelector,
        InputChoice,
        PlusIcon
    },
    data() {
        return {
            Lang,
            trackingState: TRACKING.STOPPED,
            TRACKING,
            addOptions
        }
    },
    mounted() {
        renderer.setup();
        renderer.attachScene(scene);
        renderer.start();
    },
    methods: {
        toggleTracking() {
            if (this.trackingState === TRACKING.STARTED) {
                this.trackingState = TRACKING.STOPPING;
                setTimeout(() => { this.trackingState = TRACKING.STOPPED; }, 1000);
            } else if (this.trackingState === TRACKING.STOPPED) {
                this.trackingState = TRACKING.STARTING;
                setTimeout(() => { this.trackingState = TRACKING.STARTED; }, 1000);
            }
        },
        onAdd(ev) {
            const value = ev.target.value;
            if (value.startsWith('--')) return;

            switch (value) {
                case 'camera':
                    console.log("trackingView.addCamera();");
                    break;
                case 'tracker':
                    scene.addTracker();
                    break;
            }

            ev.target.value = '--add';
        }
    }
}
</script>