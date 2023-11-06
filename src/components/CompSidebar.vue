<template>
    <div class="flex flex-col h-full w-fit p-4 space-y-10">
        <div class="flex w-full h-fit space-x-2 text-sky-500">
            <div class="flex h-fit">
                <comp-icon class="h-8" />
            </div>
            <div class="flex h-full text-center content-center">
                <p class="text-xl font-bold">
                    FullBowody
                </p>
            </div>
        </div>
        <div class="flex grow flex-col overflow-x-auto overflow-y-auto">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="$router.push(tab.path)"
                class="text-left text-lg my-1 px-3 py-2 rounded-md outline-none transition-all border-2 border-transparent"
                :class="
                    $route?.path == tab.path
                    ? 'text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-700 font-semibold hover:border-slate-400 hover:dark:border-slate-600 focus:border-slate-400 focus:dark:border-slate-600'
                    : 'text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 font-base hover:border-slate-300 hover:dark:border-slate-700 focus:border-slate-300 focus:dark:border-slate-700'
                "
            >
                <get-text :context="Lang.CreateTranslationContext('sidebar', tab.name)" />
            </button>
        </div>
        <div class="w-full h-fit">
            <comp-btnblock @click="$router.push('/settings')">
                <cog-6-tooth-icon class="h-6" />
            </comp-btnblock>
        </div>
    </div>
</template>

<script>
import CompIcon from './CompIcon.vue';
import CompBtnblock from './inputs/CompBtnblock.vue';
import Lang from '../scripts/Lang';

import {
    Cog6ToothIcon
} from '@heroicons/vue/24/outline';
import GetText from './text/GetText.vue';

const tabs = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Cameras",
        path: "/cameras"
    },
    {
        name: "Tracking",
        path: "/tracking"
    },
    {
        name: "Extensions",
        path: "/extensions"
    },
    {
        name: "Account",
        path: "/account"
    },
    {
        name: "About",
        path: "/about"
    }
]

export default {
    name: "CompSidebar",
    components: {
        CompIcon,
        CompBtnblock,
        Cog6ToothIcon,
        GetText
    },
    methods: {},
    data() {
        return {
            Lang,
            tabs
        }
    },
    mounted() {
        
    }
}
</script>