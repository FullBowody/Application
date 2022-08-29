<template>
    <div class="flex grow flex-col justify-center bg-slate-700">
        <div class="flex flex-row justify-center">
            <div class="flex flex-col justify-start text-blue-500 text-xl">
                <div class="flex flex-row justify-center wave">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-40">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                </div>
                <h1 class="text-4xl mb-10 font-bold text-center"> About FullBowody </h1>
                <div class="flex flex-row">
                    <div class="flex flex-col h-full w-full shadow-xl rounded-lg border border-2 border-slate-600 p-4 m-4">
                        <h2 class="text-slate-100 text-xl font-bold text-center"> Version </h2>
                        <div class="flex grow flex-col justify-center">
                            <p class="text-blue-500 text-2xl font-bold text-center my-4"> 1.2.0 </p>
                        </div>
                    </div>
                    <div class="flex flex-col h-full w-full shadow-xl rounded-lg border border-2 border-slate-600 p-4 m-4">
                        <h2 class="text-slate-100 text-xl font-bold text-center"> Author </h2>
                        <div class="flex grow flex-col justify-center">
                            <p v-on:click="openLink('https://github.com/FurWaz/')" class="text-blue-500 hover:text-blue-400 text-2xl font-bold text-center my-4 cursor-pointer"> FurWaz </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { openLink } from '../scripts/common';

export default {
    name: "About",
    components: {},
    methods: { openLink },
    setup() {},
    mounted() {}
}
</script>

<style scoped>
@keyframes wave {
    0% { transform: translateY(0%); }
    50% { transform: translateY(-10%); }
    100% { transform: translateY(0%); }
}
.wave {
    animation: wave 5s ease infinite;
}
</style>