<template>
    <div class="flex w-fit flex-row h-fit my-2">
        <div class="flex flex-row bg-slate-400 border border-2 border-slate-400 transition-all rounded shadow-lg w-fit h-fit space-x-[2px] overflow-hidden">
            <div
                v-for="val in items"
                class="flex grow py-0 m-0 min-h-0 h-fit cursor-pointer bg-slate-700"
                v-on:mousedown="select(val)"
            >
                <div
                    class="flex grow px-1 py-0 m-0 min-h-0 h-fit cursor-pointer transition-all"
                    :class="val.selected? 'bg-slate-600' : 'bg-slate-700'"
                >
                    <p
                        class="text-base font-semibold text-center transition-all"
                        :class="val.selected? 'text-slate-200' : 'text-slate-400'"
                    > {{ val.label }} </p>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-center font-semibold ml-4 transition-all text-slate-300">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script>
let page = null;

function updateObject() {
    for(let val of page.items) {
        val.selected = val.value == page._value;
    }
}

export default {
    name: "Choicebox",
    props: {
        state: {
            type: Number,
            default: 0
        },
        items: {
            type: Array,
            default: [{label: "Default", value: 0}]
        },
        onchange: {
            type: Function,
            default: (val) => {}
        },
        init: {
            type: Function,
            default: (obj) => {}
        }
    },
    components: {},
    methods: {
        select(val) {
            page._value = val.value;
            updateObject();
            if (page.onchange)
                page.onchange(val.value);
        }
    },
    data() {
        this.setValue = (val) => {
            if (typeof(val) != "number") return;
            this.select({value: val});
        };

        page = this;
        this._value = this.state;
        updateObject();
        return {};
    },
    setup() {},
    mounted() {
        this.init(this);
    }
}
</script>