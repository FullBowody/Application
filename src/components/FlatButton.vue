<template>
    <div
        class="flex flex-col justify-center border border-2 border-slate-600 select-none px-2 py-0.5 transition-all rounded"
        :class="
            (this.active? 'bg-slate-500 text-blue-500' : 'bg-slate-600 text-slate-400') + ' ' +
            (this.disabled? 'bg-transparent border-white/[0.1] text-white/[0.2]' : 'hover:text-slate-300 hover:border-slate-500 cursor-pointer shadow-md')
        ">
        <p class="text-xl text-center font-semibold m-0 p-0" :class="this.loading? 'h-0 overflow-hidden' : ''">
            <slot></slot>
        </p>
        <div v-if="this.loading" class="pt-1 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="spin w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "FlatButton",
    props: {
        onclick: {
            type: Function,
            default: (obj) => {}
        },
        init: {
            type: Function,
            default: (obj) => {}
        }
    },
    components: {},
    methods: {
        setSelected(state) {
            this.active = state;
            this.$forceUpdate();
        },
        setEnabled(state) {
            this.disabled = !state;
            this.$forceUpdate();
        }
    },
    data() { return { active: false, disabled: false, loading: false } },
    mounted() {
        this.init(this);

        this.$el.addEventListener("mousedown", ev => {
            if (!this.disabled) this.onclick(this);
        });

        this.startLoading = () => {
            this.loading = true;
            this.$forceUpdate();
        };

        this.stopLoading = () => {
            this.loading = false;
            this.$forceUpdate();
        };
    }
}
</script>