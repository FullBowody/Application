<template>
    <div
        class="select-none px-4 py-2 transition-all border-t-4"
        :class="this.active? 'bg-slate-700 text-blue-500 border-blue-500' : 'cursor-pointer border-slate-800 bg-slate-800 text-slate-500 hover:text-slate-400'"
    >
        <p class="text-xl font-semibold">
            <slot></slot>
        </p>
    </div>
</template>

<script>
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
    data() { return { active: false } },
    mounted() {
        this.$el.addEventListener("mousedown", ev => {
            this.onclick(this);
        });
    }
}
</script>