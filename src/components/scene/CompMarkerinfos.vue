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
            <input-vec3
                :label="Lang.CreateTranslationContext('scene', 'MarkerPos')"
                :value="marker.pose.position"
                :on-change="onMarkerPosChange"
            />
            <input-vec3
                :label="Lang.CreateTranslationContext('scene', 'MarkerRot')"
                :value="markerEulerRotation"
                :on-change="onMarkerRotChange"
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
import InputVec3 from '../inputs/InputVec3.vue';
import Lang from '../../scripts/Lang';
import CompBtnblock from '../inputs/CompBtnblock.vue';
import * as THREE from 'three';

export default {
    name: 'CompMarkerinfos',
    components: {
        GetText,
        InputText,
        InputVec3,
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
        
    },
    computed: {
        markerEulerRotation() {
            const euler = new THREE.Euler();
            euler.setFromQuaternion(new THREE.Quaternion(
                this.marker.pose.rotation.x,
                this.marker.pose.rotation.y,
                this.marker.pose.rotation.z,
                this.marker.pose.rotation.w
            ));
            return {
                x: Math.round(euler.x * 1800 / Math.PI) / 10,
                y: Math.round(euler.y * 1800 / Math.PI) / 10,
                z: Math.round(euler.z * 1800 / Math.PI) / 10
            };
        }
    },
    methods: {
        onMarkerIdChange(ev) {
            const nbId = parseInt(ev.target.value);
            if (isNaN(nbId)) return;
            this.scene.setMarkerId(this.marker.id, nbId)
        },
        onMarkerPosChange(vec) {
            this.scene.setMarkerPos(this.marker.id, vec);
        },
        onMarkerRotChange(vec) {
            const euler = new THREE.Euler(
                vec.x * Math.PI / 180,
                vec.y * Math.PI / 180,
                vec.z * Math.PI / 180,
                'XYZ'
            );
            const quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(euler);
            this.scene.setMarkerRot(this.marker.id, quaternion);
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