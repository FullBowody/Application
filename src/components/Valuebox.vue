<template>
    <div class="flex w-fit flex-row h-fit my-2">
        <input
            ref="input"
            placeholder="-"
            class="outline-none border border-2 border-slate-300 transition-all text-blue-400 text-md font-semibold rounded-md p-0.5 w-14 h-6 text-center bg-transparent focus:bg-slate-600/[0.5] focus:border-slate-200"
        />
        <div class="flex flex-col justify-center">
            <p class="text-slate-300 text-center font-semibold ml-4 transition-all">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Valuebox",
    props: {
        value: {
            type: String,
            default: ""
        },
        onchange: {
            type: Function,
            default: () => {}
        }
    },
    components: {},
    methods: {},
    data() { return {} },
    setup() {},
    mounted() {
        const input = this.$refs["input"];
        input.value = this.value;
        input.addEventListener('keyup', () => {
            this.onchange(input.value);
        });
    }
}
</script>

<style scoped>
@keyframes check-anim {
    0% {
        opacity: 0;
        transform: translateY(10%) rotate(30deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0%) rotate(0deg);
    }
}
.check-anim { animation: check-anim 0.2s ease; }
</style>