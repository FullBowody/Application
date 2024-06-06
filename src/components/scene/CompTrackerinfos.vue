<template>
    <div
        class="show-left flex flex-col w-fit h-fit dark:bg-slate-600 rounded-md bg-slate-50 border-2 transition-all max-w-full
                text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-500 p-2 space-y-4"
    >
        <div class="flex space-x-2 mx-4 justify-center">
            <div class="flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-500 rounded-full">
                <p class="text-xl font-bold">T</p>
            </div>
            <div class="flex items-center justify-center">
                <h1 class="text-lg font-semibold">
                    <get-text :context="Lang.CreateTranslationContext('scene', 'Tracker')" />
                </h1>
            </div>
        </div>
        <div class="flex flex-col">
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'TrackerId')"
                :value="tracker.id"
                @input="onTrackerIdChange"
            />
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'TrackerPos')"
                :value="tracker.position.x"
                @input="onTrackerPosChange"
            />
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'TrackerRot')"
                :value="tracker.rotation.x * 180 / Math.PI"
                @input="onTrackerRotChange"
            />
        </div>
        <div class="flex justify-between">
            <div></div>
            <comp-btnblock
                :onclick="onTrackerDelete"
            >
                <get-text :context="Lang.CreateTranslationContext('verbs', 'Delete')" />
            </comp-btnblock>
        </div>
    </div>
</template>

<script>
import GetText from '../text/GetText.vue';
import InputText from '../inputs/InputText.vue';
import Lang from '../../scripts/Lang';
import CompBtnblock from '../inputs/CompBtnblock.vue';

export default {
    name: 'CompTrackerinfos',
    components: {
        GetText,
        InputText,
        CompBtnblock
    },
    props: {
        tracker: Object,
        scene: Object
    },
    data() {
        return {
            Lang
        }
    },
    mounted() {
        console.log(this.tracker);
    },
    methods: {
        onTrackerIdChange(ev) {
            const nbId = parseInt(ev.target.value);
            if (isNaN(nbId)) return;
            this.scene.setTrackerId(this.tracker.id, nbId)
        },
        onTrackerPosChange(ev) {
            this.scene.setTrackerPos(this.tracker.id, {
                x: this.toNumber(ev.target.value),
                y: 0,
                z: 0
            });
        },
        onTrackerRotChange(ev) {
            this.scene.setTrackerRot(this.tracker.id, {
                x: this.toNumber(ev.target.value) * Math.PI / 180,
                y: 0,
                z: 0
            });
        },
        onTrackerDelete() {
            this.scene.removeTracker(this.tracker.id);
        },
        toNumber(value) {
            const nb = parseFloat(value);
            return isNaN(nb) ? 0 : nb;
        }
    }
}
</script>