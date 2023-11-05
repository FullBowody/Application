<template>
    <div class="flex w-fit max-w-full min-w-0">
        <div
            class="flex items-center justify-center w-fit h-fit bg-white dark:bg-slate-600 rounded-md bg-slate-50 border-2 transition-all max-w-full"
            :class="disabled
                ? 'text-slate-400 dark:text-slate-400 cursor-default border-transparent'
                : 'text-slate-700 dark:text-slate-200 hover:border-slate-400 hover:dark:border-slate-400 hover:text-slate-700 hover:dark:text-white border-slate-200 dark:border-slate-500'"
        >
            <component
                :is="link ? (link.startsWith('http') ? 'a' : 'router-link') : 'button'"
                ref="btn"
                class="py-1 px-2 outline-none rounded max-w-full"
                :class="(disabled? ' cursor-default': '') + classes"
                :to="href"
                :href="href"
            >
                <p class="text-md font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-full min-w-0 w-fit h-fit max-h-full min-h-0">
                    <slot />
                </p>
            </component>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompBtnblock',
    props: {
        href: {
            type: String,
            default: '',
            required: false
        },
        onclick: {
            type: Function,
            default: () => {},
            required: false
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        },
        classes: {
            type: String,
            default: '',
            required: false
        }
    },
    data() {
        return {
            window,
            link: this.href
        }
    },
    watch: {
        disabled() {
            this.link = this.disabled? undefined : this.href;
        }
    },
    mounted() {
        this.link = this.disabled? undefined : this.href;
        if (!this.link)
            this.$refs["btn"].addEventListener("click", this.onClick);
    },
    methods: {
        onClick() {
            if (this.href || this.disabled) return;
            this.onclick?.(this);
        }
    }
}
</script>