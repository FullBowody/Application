<template>
    <div class="flex grow h-fit w-full min-w-0 flex-col justify-between md:items-center md:my-2 my-1 space-y-1">
        <label
            v-if="label != ''"
            class="flex text-lg text-slate-600 dark:text-slate-300 font-bold whitespace-nowrap text-ellipsis w-fit mr-auto"
        >
            <get-text :context="label" />
        </label>
        <textarea
            ref="input"
            class="flex h-fit border-2 rounded-md w-full px-2 py-1 border-slate-200 dark:border-slate-600 font-bold text-md max-w-full
                   min-w-0 transition-colors outline-2 outline-offset-2 outline-sky-500 focus:outline placeholder-slate-400 resize-none"
            :class="disabled ? ' bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-400 ' : ' bg-white dark:bg-slate-600 text-slate-400 dark:text-slate-200 hover:border-slate-300 hover:dark:border-slate-500 '"
            :placeholder="placeholder_str"
            :type="type"
            :name="name"
            :value="value_str"
            :min="min"
            :max="max"
            :disabled="disabled"
            :cols="cols"
        />
    </div>
</template>

<script>
import Lang from '../../scripts/Lang';
import GetText from '../text/GetText.vue';

export default {
    name: 'InputArea',
    components: {
        GetText
    },
    props: {
        label: {
            type: [Object, String],
            default: () => '',
            required: false
        },
        placeholder: {
            type: [Object, String],
            default: () => '',
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            default: '',
            required: false
        },
        type: {
            type: String,
            default: 'text',
            required: false
        },
        min: {
            type: [Number, String],
            default: "",
            required: false
        },
        max: {
            type: [Number, String],
            default: "",
            required: false
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        },
        cols: {
            type: [Number, String],
            default: 20,
            required: false
        }
    },
    data() {
        return {
            isDisabled: true,
            placeholder_str: '',
            value_str: ''
        }
    },
    watch: {
        placeholder() { this.fetchTranslations(); },
        value() { this.fetchTranslations(); }
    },
    mounted() {
        this.focus = () => this.$refs.input.focus();
        this.getValue = () => this.$refs.input.value;
    },
    methods: {
        async fetchTranslations() {
            this.placeholder_str = (typeof(this.placeholder) === 'string')? this.placeholder : await Lang.GetTextAsync(this.placeholder);
            this.value_str = (typeof(this.value) === 'string')? this.value : await Lang.GetTextAsync(this.value);
        }
    }
}
</script>