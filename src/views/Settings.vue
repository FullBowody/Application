<template>
    <div class="flex grow flex-col min-h-0 overflow-auto bg-slate-700">
        <bar-title class="mt-2"> Application </bar-title>
        <div class="flex flex-col ml-2">
            <checkbox :value="true"> Keep running with windows closed (system tray) </checkbox>
        </div>
        <bar-title class="mt-20"> Tracking </bar-title>
        <div class="flex flex-col ml-2">
            <checkbox :value="true"> Smooth tracking </checkbox>
            <valuebox :value="'60'"> Tracking FPS </valuebox>
        </div>
    </div>
</template>

<script>
import BarTitle from '../components/BarTitle.vue';
import Checkbox from '../components/Checkbox.vue';
import Valuebox from '../components/Valuebox.vue';

export default {
    name: "Settings",
    components: {
        BarTitle,
        Checkbox,
        Valuebox
    },
    methods: {},
    setup() {},
    mounted() {}
}
</script>