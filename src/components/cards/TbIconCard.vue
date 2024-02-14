<template>
    <button
        class="flex relative justify-center items-center"
        :class="clickable ? 'cursor-pointer' : 'cursor-default'"
    >
        <img
            class="rounded-xl p-1"
            src="/assets/pics/toxicbloud.jpg"
            alt=""
        >
    </button>
</template>

<script>
export default {
    name: "TbIconCard",
    props: {
        clickable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    }
}
</script>
