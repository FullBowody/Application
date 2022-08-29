<template>
    <div class="flex grow-0 h-fit w-full flex-row">
        <div class="flex grow flex-col justify-center"> <div class="flex h-[2px] bg-slate-600 rounded-lg mx-2"></div> </div>
        <div class="flex flex-col justify-center"> <p class="text-center text-slate-400 font-semibold"> <slot></slot> </p> </div>
        <div class="flex grow flex-col justify-center"> <div class="flex h-[2px] bg-slate-600 rounded-lg mx-2"></div> </div>
    </div>
</template>

<script>
export default {
    name: "BarTitle",
    components: {},
    methods: {},
    setup() {},
    mounted() {}
}
</script>