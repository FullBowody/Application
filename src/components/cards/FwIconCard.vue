<template>
    <button
        class="flex relative"
        :class="clickable ? 'cursor-pointer' : 'cursor-default'"
    >
        <div
            class="absolute w-full h-full rotate-[40deg]"
            style="z-index: 1;"
        >
            <div
                class="flex w-full h-full p-[15%] grow space-x-[4%]"
                :class="clickable ? 'hover-bands' : ''"
            >
                <span
                    class="flex grow w-full bg-prim-4 mt-[10%] shadow-md transition-all"
                    :class="animate? 'noscroll show-up' : ''"
                    style="animation-delay: 000ms;"
                />
                <span
                    class="flex grow w-full bg-prim-3 mb-[10%] shadow-md transition-all"
                    :class="animate? 'noscroll show-up' : ''"
                    style="animation-delay: 100ms;"
                />
                <span
                    class="flex grow w-full bg-prim-2 mt-[10%] shadow-md transition-all"
                    :class="animate? 'noscroll show-up' : ''"
                    style="animation-delay: 200ms;"
                />
                <span
                    class="flex grow w-full bg-prim-1 mb-[10%] shadow-md transition-all"
                    :class="animate? 'noscroll show-up' : ''"
                    style="animation-delay: 300ms;"
                />
            </div>
        </div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 250 250"
            stroke-width="14"
            stroke="currentColor"
            class="w-full h-full text-white pointer-events-none p-1 drop-shadow-lg"
            :class="animate? 'noscroll show-up' : ''"
            style="z-index: 2; animation-delay: 200ms"
        >
            <path d="M-45,34" />
            <path d="M144,52" />
            <path d="M198,196" />
            <path d="M36,70" />
            <path d="M135,178" />
            <path d="M270,106" />
            <g>
                <polygon points="54,142 98.9,178.1 116.9,196 135,196 153,178.1 198,142.1 189,124 198,70 189,52 153,88 99,88 63,52 54,70 63,124" />
                <g>
                    <path
                        fill="currentColor"
                        d="M54,142.1l44.9,9c0,0,0,0,0,0l18,44.9c0,0,0,0,0,0l-17.9-17.9c0,0,0,0,0,0L54,142.1 C54,142.1,54,142.1,54,142.1z"
                    />
                    <path
                        fill="currentColor"
                        d="M198,142.1l-45,9c0,0,0,0,0,0L135,196c0,0,0,0.1,0,0l17.9-17.9c0,0,0,0,0,0L198,142.1 C198,142.1,198,142.1,198,142.1z"
                    />
                </g>
            </g>
        </svg>
    </button>
</template>

<script>
export default {
    name: "FwIconCard",
    props: {
        clickable: {
            type: Boolean,
            default: false
        },
        animate: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    }
}
</script>

<style scoped>
.hover-bands:hover :nth-child(1) { transform: translateY(5%); }
.hover-bands       :nth-child(1) { transform: translateY(0%); }
.hover-bands:hover :nth-child(2) { transform: translateY(-5%); }
.hover-bands       :nth-child(2) { transform: translateY(0%); }
.hover-bands:hover :nth-child(3) { transform: translateY(5%); }
.hover-bands       :nth-child(3) { transform: translateY(0%); }
.hover-bands:hover :nth-child(4) { transform: translateY(-5%); }
.hover-bands       :nth-child(4) { transform: translateY(0%); }
</style>