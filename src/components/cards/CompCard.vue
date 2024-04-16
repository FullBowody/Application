<template>
    <div
        class="border-2 rounded-lg"
        :class="overrideBorder? '': 'border-slate-200 dark:border-slate-600'"
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
        }
    },
    data() {
        return {}
    },
    mounted() {
        
    }
}
</script>