<template>
    <div class="flex w-fit flex-row h-fit my-2">
        <input
            v-show="!this.loading"
            ref="input"
            placeholder="-"
            class="outline-none border border-2 border-slate-400 transition-all text-slate-200 text-base font-semibold rounded shadow-lg px-0.5 w-16 h-fit text-center bg-slate-600 focus:bg-slate-500/[0.5] focus:border-slate-200"
        />
        <div v-show="this.loading" class="outline-none border border-2 border-slate-400 transition-all text-slate-200 text-base font-semibold rounded shadow-lg p-0.5 w-16 h-fit text-center bg-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-slate-200 spin w-5 h-5 mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
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
            type: null, // String or Promise
            default: ""
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
            if (typeof(val) == "string" || typeof(val) == "number") {
                this.loading = false;
                this.$forceUpdate();
                
                const input = this.$refs["input"];
                if (input == undefined) return;

                input.addEventListener('keyup', () => {
                    const toNumber = Number(input.value);
                    const newVal = isNaN(toNumber) ? input.value : toNumber;
                    this.onchange(newVal);
                });
                
                const toNumber = Number(val);
                const newVal = isNaN(toNumber) ? val : toNumber;
                input.value = newVal;
                this._value = newVal;

                if (callOnchange) this.onchange(newVal);
            }
            if (typeof(val.then) == "function") {
                this.loading = true;
                val.then((res) => {
                    this.setValue(res);
                });
            }
        };

        return { loading: true }
    },
    setup() {},
    mounted() {
        this.init(this);
        this.setValue(this.value, false);
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