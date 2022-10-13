<template>
    <div class="flex w-fit flex-row h-fit my-2">
        <div class="border border-2 transition-all text-slate-200 rounded p-0.5 w-7 h-7" :class="this.active? 'border-slate-400 bg-slate-600 shadow-md':'border-slate-500 bg-slate-700'">
            <svg v-if="!this.loading" :class="this.active? '':'hidden '" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="check-anim m-auto w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <div v-if="this.loading" class="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-slate-400 spin w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
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
            type: null, // Boolean or Promise
            default: false
        },
        onchange: {
            type: Function,
            default: () => {}
        },
        init: {
            type: Function,
            default: (obj) => {}
        }
    },
    components: {},
    methods: {},
    data() {
        this.setValue = (val, callOnchange=true) => {
            if (typeof(val) == "boolean") {
                this.loading = false;
                this.active = val;
                if (callOnchange) this.onchange(val);
            }
            if (typeof(val.then) == "function") {
                this.loading = true;
                val.then((res) => {
                    this.setValue(res);
                });
            }
        };

        return { active: false, loading: true }
    },
    setup() {},
    mounted() {
        this.init(this);
        this.setValue(this.value, false);
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