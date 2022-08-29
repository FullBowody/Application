<template>
    <div class="flex grow flex-col justify-center bg-slate-700">
        <div class="flex flex-row justify-center">
            <div class="flex flex-col justify-start text-blue-500 text-xl">
                <div class="flex flex-row justify-center wave">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-40">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                </div>
                <h1 class="text-4xl mb-10 font-bold text-center"> FullBowody </h1>
                <div class="text-xl text-slate-100">
                    <p> Thank you for using FullBowody. </p>
                    <p> All available documentation can be found <span class="text-blue-500 cursor-pointer hover:text-blue-400" v-on:mousedown="openLink('http://furwaz.com/fullbowody')">here</span> </p>
                    <p> Body tracking can be setup in the <span class="text-blue-500 cursor-pointer hover:text-blue-400" v-on:mousedown="openLink('/tracking')">Tracking</span> section </p>
                    <p> Extensions can be managed in the <span class="text-blue-500 cursor-pointer hover:text-blue-400" v-on:mousedown="openLink('/extensions')">Extensions</span> section </p>
                    <p> All app settings can be changed in the <span class="text-blue-500 cursor-pointer hover:text-blue-400" v-on:mousedown="openLink('/settings')">Settings</span> section </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { openLink } from '../scripts/common';

export default {
    name: "Home",
    components: {},
    methods: { openLink },
    setup() {},
    mounted() {
        if (window.location.href.endsWith("/"))
            window.location.href = "/home";
    }
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