<template>
    <div class="flex grow flex-col space-y-8 min-w-0 max-w-full p-4">
        <div class="h-fit w-full">
            <p class="text-xl font-semibold pb-2">
                <get-text :context="Lang.CreateTranslationContext('listeners', 'ListenersServer')" />
            </p>
            <comp-card class="flex justify-between p-4">
                <div class="w-fit space-y-4 min-w-0">
                    <div class="flex text-md space-x-8 w-full justify-between">
                        <p class="whitespace-nowrap text-ellipsis overflow-hidden">
                            <get-text :context="Lang.CreateTranslationContext('listeners', 'ServerPort')" />
                        </p>
                        <p class="font-semibold"> {{ getSetting('listeners.serverPort') }} </p>
                    </div>
                    <div class="flex text-md space-x-8 w-full justify-between">
                        <p class="whitespace-nowrap text-ellipsis overflow-hidden">
                            <get-text :context="Lang.CreateTranslationContext('listeners', 'ServerAddress')" />
                        </p>
                        <p class="font-semibold"> {{ getSetting('listeners.serverAddress') }} </p>
                    </div>
                    <div class="flex text-md space-x-8 w-full justify-between">
                        <p class="whitespace-nowrap text-ellipsis overflow-hidden">
                            <get-text :context="Lang.CreateTranslationContext('listeners', 'ServerStatus')" />
                        </p>
                        <p class="font-semibold" :class="'text-' + SERVER_COLORS[this.serverStatus] + '-500'">
                            <get-text :context="SERVER_STRINGS[this.serverStatus] ?? ''" />
                        </p>
                        <!-- just for tailwind class generation -->
                        <p class="hidden text-slate-500 text-red-500 text-orange-500 text-green-500" />
                    </div>
                </div>
                <div class="flex flex-col grow justify-center items-end">
                    <div class="flex flex-col h-full justify-evenly items-center">
                        <comp-btnblock
                            :disabled="serverStatus !== SERVER_STATUS.OFFLINE"
                            :onclick="startServer"
                        >
                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Start')" />
                        </comp-btnblock>
                        <comp-btnblock
                            :disabled="serverStatus !== SERVER_STATUS.ONLINE"
                            :onclick="stopServer"
                        >
                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Stop')" />
                        </comp-btnblock>
                    </div>
                </div>
            </comp-card>
        </div>
        <div class="h-fit w-full">
            <p class="text-xl font-semibold pb-2">
                <get-text :context="Lang.CreateTranslationContext('listeners', 'ListenersConnected')" />
            </p>
            <comp-card class="flex justify-between p-4">
                <div
                    v-if="listeners.length === 0"
                    class="h-fit w-fit my-8 mx-auto">
                    <p class="text-center text-lg font-semibold">
                        <get-text :context="Lang.CreateTranslationContext('listeners', 'NoListeners')" />
                    </p>
                    <p class="text-center text-md">
                        <get-text :context="Lang.CreateTranslationContext('listeners', 'NoListenersDesc')" />
                    </p>
                </div>
            </comp-card>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import Lang from '@/scripts/Lang';
import CompCard from '@/components/cards/CompCard.vue';
import { getSetting } from "@/scripts/settings";
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';

const SERVER_STATUS = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    STARTING: 'STARTING',
    STOPPING: 'STOPPING'
};
const SERVER_STRINGS = {
    ONLINE: Lang.CreateTranslationContext('listeners', 'Online'),
    OFFLINE: Lang.CreateTranslationContext('listeners', 'Offline'),
    STARTING: Lang.CreateTranslationContext('listeners', 'Starting'),
    STOPPING: Lang.CreateTranslationContext('listeners', 'Stopping')
};
const SERVER_COLORS = {
    ONLINE: 'green',
    OFFLINE: 'red',
    STARTING: 'orange',
    STOPPING: 'orange'
}

export default {
    name: "listeners",
    components: {
        GetText,
        CompCard,
        CompBtnblock
    },
    methods: {},
    data() {
        return {
            Lang,
            serverStatus: null,
            SERVER_STATUS,
            SERVER_STRINGS,
            SERVER_COLORS,
            listeners: []
        }
    },
    mounted() {
        this.serverStatus = SERVER_STATUS.OFFLINE;
    },
    methods: {
        getSetting,
        startServer() {
            this.serverStatus = SERVER_STATUS.STARTING;
            setTimeout(() => {
                this.serverStatus = SERVER_STATUS.ONLINE;
            }, 1000);
        },
        stopServer() {
            this.serverStatus = SERVER_STATUS.STOPPING;
            setTimeout(() => {
                this.serverStatus = SERVER_STATUS.OFFLINE;
            }, 1000);
        }
    }
}
</script>
