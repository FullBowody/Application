<template>
    <div id="app" class="select-none flex flex-col w-screen h-screen min-h-0 bg-slate-700">
        <top-bar :onchange="changeTab"></top-bar>
        <div class="flex grow flex-col bg-slate-700 min-h-0 overflow-hidden">
            <router-view></router-view>
            <div class="flex h-0 w-full">
                <p class="text-right h-fit w-fit mx-auto bg-slate-700 text-slate-500 text-xl font-bold"> ... Loading ... </p>
            </div>
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

        window.addEventListener("keydown", ev => {
            const isAlt = ev.key == 'Alt';
            const isReload = ev.key.toLowerCase() == 'r' && ev.ctrlKey;
            const isPanel = ev.key.toLowerCase() == 'i' && ev.ctrlKey && ev.shiftKey;

            if (isAlt || isReload || isPanel) {
                //ev.preventDefault();
            }
        })
    }
};
</script>

<style src="./assets/main.css" />
