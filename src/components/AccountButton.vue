<template>
    <div
        class="border border-2 flex px-2 py-1 m-0.5 mr-2 my-1 rounded-md cursor-pointer transition-all select-none"
        :class="this.active? 'bg-slate-700 text-blue-500 border-blue-500' : 'cursor-pointer border-slate-700 bg-slate-800 text-slate-500 hover:text-slate-400'"
    >
        <div class="flex flex-col justify-center mr-2">
            <p class="text-xl font-semibold"> {{ User.CurrentUser == null ? 'Account' : User.CurrentUser.username }} </p>
        </div>
        <div class="flex flex-col justify-center">
            <div v-if="User.CurrentUser == null">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </div>
            <div v-if="User.CurrentUser != null">
                <img :src="User.CurrentUser.icon" alt="user icon" class="h-8 rounded-lg">
            </div>
        </div>
    </div>
</template>

<script>
import User from '../scripts/User';

export default {
    name: "TopBarButton",
    props: {
        onclick: {
            type: Function,
            default: () => {}
        }
    },
    components: {},
    methods: {
        setSelected(state) {
            this.active = state;
            this.$forceUpdate();
        }
    },
    data() { return { User, active: false } },
    mounted() {
        this.$el.addEventListener("mousedown", ev => {
            this.onclick(this);
        });
    }
}
</script>