<template>
    <div
        class="show-left flex flex-col w-fit h-fit dark:bg-slate-600 rounded-md bg-slate-50 border-2 transition-all max-w-full
                text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-500 p-2 space-y-4"
    >
        <div class="flex space-x-2 mx-4 justify-center">
            <div class="flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-500 rounded-full">
                <p class="text-xl font-bold">M</p>
            </div>
            <div class="flex items-center justify-center">
                <h1 class="text-lg font-semibold">
                    <get-text :context="Lang.CreateTranslationContext('scene', 'Marker')" />
                </h1>
            </div>
        </div>
        <div class="flex flex-col">
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'MarkerId')"
                :value="marker.id"
                @input="onMarkerIdChange"
            />
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'MarkerPos')"
                :value="marker.position.x"
                @input="onMarkerPosChange"
            />
            <input-text
                :label="Lang.CreateTranslationContext('scene', 'MarkerRot')"
                :value="marker.rotation.x * 180 / Math.PI"
                @input="onMarkerRotChange"
            />
        </div>
        <div class="flex justify-between">
            <div></div>
            <comp-btnblock
                :onclick="onMarkerDelete"
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
    name: 'CompMarkerinfos',
    components: {
        GetText,
        InputText,
        CompBtnblock
    },
    props: {
        marker: Object,
        scene: Object
    },
    data() {
        return {
            Lang
        }
    },
    mounted() {
        console.log(this.marker);
    },
    methods: {
        onMarkerIdChange(ev) {
            const nbId = parseInt(ev.target.value);
            if (isNaN(nbId)) return;
            this.scene.setMarkerId(this.marker.id, nbId)
        },
        onMarkerPosChange(ev) {
            this.scene.setMarkerPos(this.marker.id, {
                x: this.toNumber(ev.target.value),
                y: 0,
                z: 0
            });
        },
        onMarkerRotChange(ev) {
            this.scene.setMarkerRot(this.marker.id, {
                x: this.toNumber(ev.target.value) * Math.PI / 180,
                y: 0,
                z: 0
            });
        },
        onMarkerDelete() {
            this.scene.removeMarker(this.marker.id);
        },
        toNumber(value) {
            const nb = parseFloat(value);
            return isNaN(nb) ? 0 : nb;
        }
    }
}
</script>