<template>
    <div
        class="show-left flex flex-col w-fit h-fit dark:bg-slate-600 rounded-md bg-slate-50 border-2 transition-all max-w-full
                text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-500 p-2 space-y-4"
    >
        <div class="flex space-x-2 mx-4 justify-center">
            <div class="flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-500 rounded-full">
                <p class="text-xl font-bold">C</p>
            </div>
            <div class="flex items-center justify-center">
                <h1 class="text-lg font-semibold">
                    <get-text :context="Lang.CreateTranslationContext('scene', 'Camera')" />
                </h1>
            </div>
        </div>
        <div class="flex flex-col">
            <input-vec3
                :label="Lang.CreateTranslationContext('scene', 'CameraPos')"
                :disabled="true"
                :value="camera.pose.position"
            />
            <input-vec3
                :label="Lang.CreateTranslationContext('scene', 'CameraRot')"
                :disabled="true"
                :value="cameraEulerRotation"
            />
        </div>
        <div class="flex justify-between">
            <div></div>
            <comp-btnblock
                :onclick="onCameraDelete"
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
    name: 'CompCamerainfos',
    components: {
        GetText,
        InputText,
        InputVec3,
        CompBtnblock
    },
    props: {
        camera: Object,
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
        cameraEulerRotation() {
            const euler = new THREE.Euler();
            euler.setFromQuaternion(new THREE.Quaternion(
                this.camera.pose.rotation.x,
                this.camera.pose.rotation.y,
                this.camera.pose.rotation.z,
                this.camera.pose.rotation.w
            ));
            return {
                x: Math.round(euler.x * 1800 / Math.PI) / 10,
                y: Math.round(euler.y * 1800 / Math.PI) / 10,
                z: Math.round(euler.z * 1800 / Math.PI) / 10
            };
        }
    },
    methods: {
        onCameraDelete() {
            this.scene.removeCamera(this.camera.id);
        }
    }
}
</script>