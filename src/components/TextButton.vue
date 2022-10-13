<template>
    <div
        class="flex justify-center border border-2 border-transparent bg-transparent select-none px-2 py-0.5 transition-all rounded"
        :class="
            (this.active? 'text-blue-500' : 'text-slate-500') + ' ' +
            (this.disabled? 'text-slate-600' : 'hover:text-slate-400 hover:bg-white/[0.03] cursor-pointer')
        ">
        <p class="text-xl text-center font-semibold m-0 p-0">
            <slot></slot>
        </p>
    </div>
</template>

<script>
export default {
    name: "TextButton",
    props: {
        onclick: {
            type: Function,
            default: () => {}
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
    data() { return { active: false, disabled: false } },
    mounted() {
        this.init(this);

        this.$el.addEventListener("mousedown", ev => {
            if (!this.disabled) this.onclick(this);
        });
    }
}
</script>