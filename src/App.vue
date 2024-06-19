<template>
    <div id="app" class="select-none outline-none outline-sky-500 flex flex-col w-screen h-screen min-h-0 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
        <div class="flex grow flex-row min-h-0 overflow-hidden">
            <comp-sidebar />
            <div class="flex grow p-2 min-w-0 max-w-full">
                <div class="flex grow bg-slate-50 dark:bg-slate-700 rounded-lg min-w-0 max-w-full overflow-hidden">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CompSidebar from './components/CompSidebar.vue';
import { getSetting } from './scripts/settings';

export default {
    name: "App",
    components: {CompSidebar},
    methods: {},
    setup() {
        const devMode = import.meta.env.DEV;

        // disabled dev tools in production
        if (!devMode) {
            window.addEventListener("keydown", ev => {
                const isAlt = ev.key == 'Alt';
                const isReload = (ev.key.toLowerCase() == 'r' || ev.key.toLowerCase() == 'w') && ev.ctrlKey;
                const isPanel = ev.key.toLowerCase() == 'i' && ev.ctrlKey && ev.shiftKey;

                if (isAlt || isReload || isPanel) {
                    ev.preventDefault();
                }
            });
        }

        // load engine from settings folder
        const engineFolder = getSetting('advanced.enginePath');
        if (engineFolder) ipc.invoke("change-engine-path", engineFolder);
    },
    mounted() {
        this.$router.push({name: 'Home'});
    }
};
</script>
