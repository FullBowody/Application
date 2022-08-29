<template>
    <div class="flex w-fit flex-row h-fit my-2">
        <div class="border border-2 transition-all text-blue-400 rounded-md p-0.5 w-6 h-6" :class="this.active? 'border-slate-300':'border-slate-400'">
            <svg :class="this.active? '':'hidden '" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="check-anim m-auto w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-center font-semibold ml-4 transition-all" :class="this.active? 'text-slate-300': 'text-slate-400'">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Checkbox",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        onchange: {
            type: Function,
            default: () => {}
        }
    },
    components: {},
    methods: {},
    data() { return { active: this.value } },
    setup() {},
    mounted() {
        this.$el.addEventListener('mousedown', () => {
            this.active = !this.active;
            this.onchange(this.active);
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