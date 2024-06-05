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
        <div class="flex absolute w-full h-full items-start z-50 pointer-events-none">
            <div class="mx-auto m-4 pointer-events-auto">
                <comp-vue-selector />
            </div>
        </div>
        <div class="flex absolute w-full h-full items-end z-50 pointer-events-none">
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
        <!-- [END] FLOATING UI -->
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import CompVueSelector from '@/components/scene/CompVueSelector.vue';
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
        GetText,
        CompBtnblock,
        CompVueSelector
    },
    data() {
        return {
            Lang,
            trackingState: TRACKING.STOPPED,
            TRACKING
        }
    },
    mounted() {
        trackingView.setup();
        trackingView.start();
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
        }
    }
}
</script>