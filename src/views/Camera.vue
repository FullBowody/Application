<template>
    <div class="flex grow-0 h-fit flex-col rounded-lg border border-2 border-slate-600 shadow-md px-2 py-1 m-4">
        <h3 class="font-semibold text-slate-400 m-0 p-0">Camera 1</h3>
        <div class="flex grow flex-row">
            <div class="min-h-[4em] h-full w-[50%] p-1"></div>
            <div class="flex w-[2px] bg-slate-600 rounded-lg my-2"></div>
            <div class="min-h-[4em] h-full w-[50%] p-1">
                <select name="cam-name" id="cam-name" class="flex w-fit max-w-full px-2 py-1 bg-slate-600 text-slate-100 mx-auto outline-none">
                    <option value="0">HP Vision 3</option>
                </select>
                <bar-title class="mt-4 mb-2">Calibration</bar-title>
                <p class="text-slate-300 ml-2">Calibration used : <span class="text-slate-100 bg-slate-600 py-0.5 px-2 rounded-md">default</span></p>
                <flat-button class="flex grow mx-1 mt-2"> Calibrate camera </flat-button>
                <div class="flex flex-row justify-evenly mt-2">
                    <flat-button class="w-full mx-1"> Save </flat-button>
                    <flat-button class="w-full mx-1"> Load </flat-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarTitle from '../components/BarTitle.vue';
import FlatButton from '../components/FlatButton.vue';

export default {
    name: "Camera",
    components: { BarTitle, FlatButton },
    methods: {},
    setup() {},
    mounted() {}
}
</script>