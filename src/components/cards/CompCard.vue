<template>
    <div
        class="border-2 rounded-lg border-slate-200 dark:border-slate-600"
        :class="classes"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: "CompCard",
    components: {},
    methods: {},
    props: {
        overrideBorder: {
            type: Boolean,
            default: false
        },
        classes: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    mounted() {
        
    }
}
</script>