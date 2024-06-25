<template>
    <div class="flex grow min-w-0 max-w-full p-4">
        <div
            v-if="User.CurrentUser === null"
            class="flex grow justify-center items-center"
        >
            <div class="w-fit h-fit text-center space-y-8">
                <div class="w-fit mx-auto">
                    <p class="text-2xl font-semibold">
                        <get-text :context="Lang.CreateTranslationContext('account', 'NotLoggedIn')" />
                    </p>
                    <p class="text-md">
                        <get-text :context="Lang.CreateTranslationContext('account', 'NotLoggedInDesc')" />
                    </p>
                </div>
                <div class="w-fit mx-auto">
                    <comp-btnblock @click="login">
                        <get-text :context="Lang.CreateTranslationContext('verbs', 'LogIn')" />
                    </comp-btnblock>
                </div>
            </div>
        </div>
        <div
            v-else
            class="flex max-w-full grow flex-col space-y-8 items-center"
        >
            <div class="h-fit w-full">
                <p class="text-xl font-semibold pb-2">
                    <get-text :context="Lang.CreateTranslationContext('account', 'Account')" />
                </p>
                <comp-card class="flex justify-between p-4">
                    <div class="flex w-fit min-w-0 my-4 space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <div class="flex h-full w-fit justify-center items-center">
                            <div class="h-fit w-fit">
                                <p class="text-3xl font-semibold">
                                    {{ User.CurrentUser?.pseudo }}
                                </p>
                                <p class="text-md">
                                    <get-text :context="Lang.CreateTranslationContext('verbs', 'Connected')" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col grow justify-center items-end">
                        <div class="flex flex-col h-full justify-evenly items-center">
                            <comp-btnblock :onclick="logout">
                                <get-text :context="Lang.CreateTranslationContext('verbs', 'LogOut')" />
                            </comp-btnblock>
                        </div>
                    </div>
                </comp-card>
            </div>
            <div class="h-fit w-full">
                <div class="flex justify-between mb-2">
                    <p class="text-xl font-semibold">
                        <get-text :context="Lang.CreateTranslationContext('account', 'Plugins')" />
                    </p>
                    <div class="flex w-fit justify-center items-center">
                        <comp-btnblock :onclick="refreshPlugins">
                            <svg ref="refreshIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="h-4 text-slate-200">
                                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
                            </svg>
                        </comp-btnblock>
                    </div>
                </div>
                <comp-card class="flex min-w-0 max-w-full justify-between p-4 overflow-y-hidden overflow-x-auto space-x-4">
                    <div
                        v-if="plugins.length === 0"
                        class="h-fit w-fit my-8 mx-auto">
                        <p class="text-center text-lg font-semibold">
                            <get-text :context="Lang.CreateTranslationContext('account', 'NoPlugins')" />
                        </p>
                        <p class="flex space-x-1 text-center text-md">
                            <get-text :context="Lang.CreateTranslationContext('account', 'NoPluginsDesc')" />
                            <button
                                class="href"
                                @click="openPluginsPage"
                            >
                                <get-text :context="Lang.CreateTranslationContext('account', 'Here')" />
                            </button>
                        </p>
                    </div>
                    <comp-plugin
                        v-for="plugin in plugins"
                        :key="plugin.id"
                        :plugin="plugin"
                    />
                </comp-card>
            </div>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import User from '@/scripts/User';
import Lang from '@/scripts/Lang';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import '@/scripts/portal.min.js';
import CompCard from '@/components/cards/CompCard.vue';
import CompPlugin from '@/components/account/CompPlugin.vue';
import CompBtntext from '@/components/inputs/CompBtntext.vue';
import API from '../scripts/API';

export default {
    name: "Account",
    components: {
        GetText,
        CompBtnblock,
        CompCard,
        CompBtntext,
        CompPlugin
    },
    methods: {},
    data() {
        return {
            User,
            Lang,
            plugins: []
        }
    },
    mounted() {
        
    },
    methods: {
        async login() {
            const response = await API.execute(API.ROUTE.TOKEN());
            const token = response.data;

            ipc.send('open-url', 'https://furwaz.fr/portal?token=' + token);
            this.register(token);
        },
        async register(token) {
            try {
                const response = await API.execute(API.ROUTE.REGISTER(token));
                const user = new User(response.data);
                user.save();
                this.$forceUpdate();
            } catch (err) { console.error(err); }
        },
        logout() {
            User.forget();
            this.$forceUpdate();
        },
        openPluginsPage() {
            ipc.send('open-url', 'https://fullbowody.projects.furwaz.fr/plugins');
        },
        refreshPlugins() {
            const icon = this.$refs.refreshIcon;
            icon.classList.add('spin');
            setTimeout(() => {
                icon.classList.remove('spin');
            }, 500);

            // TODO : Refresh plugins
        }
    }
}
</script>
