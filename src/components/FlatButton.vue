<template>
    <div
        class="flex justify-center border border-2 border-slate-600 select-none cursor-pointer px-1.5 py-0.5 transition-all"
        :class="this.active? 'bg-slate-500 text-blue-500' : 'bg-slate-600 text-slate-400 hover:text-slate-300 hover:border-slate-500'"
    >
        <p class="text-xl text-center font-semibold m-0 p-0">
            <slot></slot>
        </p>
    </div>
</template>

<script>
export default {
    name: "FlatButton",
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
    data() { return { active: false } },
    mounted() {
        this.$el.addEventListener("mousedown", ev => {
            this.onclick(this);
        });
    }
}
</script>