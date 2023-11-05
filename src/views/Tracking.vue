<template>
    <div class="flex grow flex-col min-w-0 max-w-full">
        <div class="flex w-full h-0 items-start z-50">
            <comp-card class="h-fit w-64 mx-auto m-4 p-0 overflow-hidden bg-slate-50 dark:bg-slate-700">
                <div class="flex grow relative">
                    <div
                        class="flex absolute w-[50%] h-full z-0 transition-all p-1"
                        :class="viewMode === '3Dview'? '': 'translate-x-[7.9em]'"
                    >
                        <span class="flex grow bg-sky-500 dark:bg-sky-600 rounded-md border-2 border-sky-600 dark:border-sky-500" />
                    </div>
                    <button
                        class="flex w-1/2 h-full justify-center items-center p-2 z-50"
                        @click="setViewMode('3Dview')"
                    >
                        <p
                            class="whitespace-nowrap text-ellipsis overflow-hidden transition-all"
                            :class="viewMode === '3Dview'? 'text-slate-50 font-bold': 'text-slate-600 dark:text-slate-200 font-base'"
                        >
                            <get-text :context="Lang.CreateTranslationContext('tracking', '3DView')" />
                        </p>
                    </button>
                    <button
                        class="flex w-1/2 h-full justify-center items-center p-2 z-50"
                        @click="setViewMode('Camera')"
                    >
                        <p
                            class="whitespace-nowrap text-ellipsis overflow-hidden transition-all"
                            :class="viewMode === 'Camera'? 'text-slate-50 font-bold': 'text-slate-600 dark:text-slate-200 font-base'"
                        >
                            <get-text :context="Lang.CreateTranslationContext('tracking', 'Cameras')" />
                        </p>
                    </button>
                </div>
                <div
                    class="flex h-fit transition-all overflow-hidden px-2"
                    :class="viewMode === 'Camera'? 'max-h-[4em]': 'max-h-[0em]'"
                >
                    <div class="flex w-full border-t-2 border-slate-200 dark:border-slate-600 z-50 px-2">
                        <input-choice
                            :label="Lang.CreateTranslationContext('tracking', 'Camera')"
                            :list="[{name: 'Camera 1', value: 'cam1'}, {name: 'Camera 2', value: 'cam2'}]"
                            :value="'cam1'"
                        />
                    </div>
                </div>
            </comp-card>
        </div>
        <div class="flex grow max-h-full max-w-full">
            <canvas id="3Dview" class="flex grow" />
        </div>
        <div class="flex w-full h-0 items-end z-50">
            <div class="h-fit w-fit mx-auto m-4 p-2">
                <comp-btnblock
                    class="text-xl"
                    :onclick="toggleTracking"
                    :disabled="trackingState === TRACKING.STARTING || trackingState === TRACKING.STOPPING"
                >
                    <get-text
                        class="p-2"
                        :context="Lang.CreateTranslationContext('tracking', trackingState)"
                    />
                </comp-btnblock>
            </div>
        </div>
    </div>
</template>

<script>
import CompCard from '@/components/cards/CompCard.vue';
import InputChoice from '@/components/inputs/InputChoice.vue';
import GetText from '@/components/text/GetText.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import Lang from '@/scripts/Lang';
import * as trackingView from '@/scripts/tracking';

const TRACKING = {
    STOPPED: 'StartTracking',
    STARTED: 'StopTracking',
    STARTING: 'StartingTracking',
    STOPPING: 'StoppingTracking'
}

export default {
    name: "Tracking",
    components: {
        CompCard,
        InputChoice,
        GetText,
        CompBtnblock
    },
    data() {
        return {
            Lang,
            viewMode: '3Dview',
            trackingState: TRACKING.STOPPED,
            TRACKING
        }
    },
    mounted() {
        trackingView.setup();
        trackingView.start();
    },
    methods: {
        setViewMode(mode) {
            this.viewMode = mode;
        },
        toggleTracking() {
            if (this.trackingState === TRACKING.STARTED) {
                this.trackingState = TRACKING.STOPPING;
                setTimeout(() => { this.trackingState = TRACKING.STOPPED; }, 1000);
            } else if (this.trackingState === TRACKING.STOPPED) {
                this.trackingState = TRACKING.STARTING;
                setTimeout(() => { this.trackingState = TRACKING.STARTED; }, 1000);
            }
        }
    }
}
</script>