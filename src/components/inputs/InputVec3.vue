<template>
    <div
        class="flex grow h-fit max-w-full w-full min-w-0 justify-between flex-col md:my-2 my-1"
        :class="orientation == 'row' ? ' md:flex-row md:space-x-8 ' : 'space-y-1'"
    >
        <label
            v-if="label"
            class="flex text-md text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-ellipsis w-fit items-center"
        >
            <get-text :context="label" />
        </label>
        <div class="flex max-w-full w-fit h-fit justify-between space-x-2.5">
            <input
                ref="input"
                type="number"
                name="x"
                class="flex h-8 border-2 rounded-md px-2 py-1 border-slate-200 dark:border-slate-500 font-semibold text-sm whitespace-nowrap max-w-[4em]
                    hover:border-slate-300 hover:dark:border-slate-400 focus:border-slate-300 focus:dark:border-slate-400 min-w-0 w-full text-ellipsis transition-colors outline-none placeholder-slate-400"
                :class="additionnalClasses"
                :value="x"
                :disabled="disabled"
                @input="onValueChanged({x: $event.target.value})"
            >
            <input
                ref="input"
                type="number"
                name="y"
                class="flex h-8 border-2 rounded-md px-2 py-1 border-slate-200 dark:border-slate-500 font-semibold text-sm whitespace-nowrap max-w-[4em]
                    hover:border-slate-300 hover:dark:border-slate-400 focus:border-slate-300 focus:dark:border-slate-400 min-w-0 w-full text-ellipsis transition-colors outline-none placeholder-slate-400"
                :class="additionnalClasses"
                :value="y"
                :disabled="disabled"
                @input="onValueChanged({y: $event.target.value})"
            >
            <input
                ref="input"
                type="number"
                name="z"
                class="flex h-8 border-2 rounded-md px-2 py-1 border-slate-200 dark:border-slate-500 font-semibold text-sm whitespace-nowrap max-w-[4em]
                    hover:border-slate-300 hover:dark:border-slate-400 focus:border-slate-300 focus:dark:border-slate-400 min-w-0 w-full text-ellipsis transition-colors outline-none placeholder-slate-400"
                :class="additionnalClasses"
                :value="z"
                :disabled="disabled"
                @input="onValueChanged({z: $event.target.value})"
            >
        </div>
    </div>
</template>

<script>
import GetText from '../text/GetText.vue';

export default {
    name: "InputVec3",
    components: {
        GetText
    },
    props: {
        label: {
            type: [String, Object],
            default: '',
            required: true
        },
        value: {
            type: Object,
            default: () => { return { x: 0, y: 0, z: 0 } },
            required: true
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        },
        orientation: {
            type: String,
            default: 'row',
            required: false
        },
        onChange: {
            type: Function,
            default: () => { return () => {} },
            required: false
        },
    },
    data() {
        return {
            x: this.value.x,
            y: this.value.y,
            z: this.value.z,
            additionnalClasses:
                (this.disabled ? ' bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-400 ' : ' bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-200 hover:border-slate-300 hover:dark:border-slate-500 ') +
                (this.showCopy ? ' rounded-r-none' : ''),
        }
    },
    watch: {
        value: function (newVal) {
            const parsed = {
                x: this.toNumber(newVal.x, this.x),
                y: this.toNumber(newVal.y, this.y),
                z: this.toNumber(newVal.z, this.z)
            }
            if (parsed.x !== this.x) this.x = parsed.x;
            if (parsed.y !== this.y) this.y = parsed.y;
            if (parsed.z !== this.z) this.z = parsed.z;
        }
    },
    methods: {
        onValueChanged(newVal) {
            if (newVal.x) this.x = this.toNumber(newVal.x, this.x);
            if (newVal.y) this.y = this.toNumber(newVal.y, this.y);
            if (newVal.z) this.z = this.toNumber(newVal.z, this.z);
            this.onChange({ x: this.x, y: this.y, z: this.z });
        },
        toNumber(thing, fallback=0) {
            const nb = Number(thing);
            return isNaN(nb) ? fallback : nb;
        }
    }
}
</script>
