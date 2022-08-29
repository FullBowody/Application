<template>
    <div class="flex grow flex-row">
        <div class="flex flex-col w-[50%] min-w-0 min-h-0">
            <h2 class="text-xl text-slate-300 text-center mx-auto mt-2 border-b-2 border-slate-500"> Cameras </h2>
        </div>
        <div class="flex w-[2px] bg-slate-600 rounded-lg my-4"></div>
        <div class="flex flex-col w-[50%] min-w-0 min-h-0">
            <h2 class="text-xl text-slate-300 text-center mx-auto mt-2 border-b-2 border-slate-500"> Preview </h2>
            <preview></preview>
        </div>
    </div>
</template>

<script>
import Preview from './Preview.vue';

export default {
    name: "Tracking",
    components: { Preview },
    methods: {},
    setup() {},
    mounted() {}
}
</script>