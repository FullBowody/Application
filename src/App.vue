<template>
    <div id="app" class="select-none flex flex-col w-screen h-screen bg-slate-700">
        <top-bar :onchange="changeTab"></top-bar>
        <div class="flex grow bg-slate-700">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TopBar from './views/TopBar.vue';

function changeTab(name) {
    window.location.href = "/" + name;
}

export default {
    name: "App",
    components: {
        TopBar
    },
    methods: {
        changeTab
    },
    setup() {
        ipc.send('setTitle', 'FullBowody - Application');
    }
};
</script>

<style src="./assets/main.css" />
