<template>
    <div class="flex h-fit w-full justify-between md:space-x-8 items-center my-2">
        <label class="flex text-md text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-ellipsis w-fit">
            <get-text :context="label" />
        </label>
        <div class="flex grow h-fit justify-end items-center">
            <button
                ref="switch"
                class="flex rounded-md w-14 h-8 cursor-pointer outline-none transition-all border-2 p-1"
                :class="state ? ' bg-sky-500 dark:bg-sky-600 border-sky-600 dark:border-sky-500 hover:border-sky-700 hover:dark:border-sky-400 focus:border-sky-700 focus:dark:border-sky-400 ' : ' bg-white dark:bg-slate-600 border-slate-200 dark:border-slate-500 hover:border-slate-300 hover:dark:border-slate-400 focus:border-slate-300 focus:dark:border-slate-400 '"
            >
                <div
                    class="flex rounded h-5 w-5 transition-all"
                    :class="state ? ' translate-x-6 bg-white dark:bg-slate-200 ' : ' translate-x-0 bg-slate-500 dark:bg-slate-400 '"
                />
            </button>
        </div>
        <input
            ref="checkbox"
            type="checkbox"
            :name="name"
            class="hidden"
        >
    </div>
</template>

<script>
import GetText from '../text/GetText.vue';

export default {
  components: { GetText },
    name: 'InputSwitch',
    props: {
        label: {
            type: [Object, String],
            default: '',
            required: false
        },
        value: {
            type: [String, Boolean, Number],
            default: false,
            required: false
        },
        name: {
            type: String,
            default: "",
            required: false
        },
        onchange: {
            type: Function,
            default: () => { },
            required: false
        }
    },
    data() {
        if (this.value != undefined) {
            switch (typeof this.value) {
            case "string": this.state = this.value === "true"; break;
            case "boolean": this.state = this.value; break;
            default: this.state = false; break;
            }
        }
        return {};
    },
    watch: {
        value: function (val) {
            this.applyValue(val, false);
        }
    },
    mounted() {
        this.$refs["switch"].addEventListener("click", ev => {
            this.applyValue(!this.state);
        });
        this.updateButton();
        this.applyValue(this.value, false);
    },
    methods: {
        updateButton() {
            const checkbox = this.$refs["checkbox"];
            checkbox.checked = this.state;
            this.$forceUpdate();
        },
        applyValue(val, sendEvent = true) {
            switch (typeof val) {
            case "string": this.state = val === "true"; break;
            case "number": this.state = val > 0; break;
            case "boolean": this.state = val; break;
            default: this.state = false; break;
            }
            this.updateButton();
            if (sendEvent) this.onchange?.({ target: { value: this.state } });
        }
    }
}
</script>