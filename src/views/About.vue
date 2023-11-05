<template>
    <div class="flex grow flex-col min-w-0 max-w-full p-4 overflow-x-hidden overflow-y-auto m-4">
        <div class="mx-auto h-fit w-[40em]">
            <div class="flex mx-auto justify-center my-4">
                <comp-icon class="text-sky-500 w-20" />
                <div class="flex justify-center items-center">
                    <h1 class="text-4xl text-sky-500 font-bold text-center">
                        <get-text :context="Lang.CreateTranslationContext('about', 'About')" />
                    </h1>
                </div>
            </div>
            <div class="mb-20">
                <div class="flex items-center space-x-4 py-2">
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                    <p class="text-xl font-semibold pb-2 whitespace-nowrap">
                        <get-text :context="Lang.CreateTranslationContext('about', 'Author')" />
                    </p>
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                </div>
                <div class="flex flex-wrap items-center justify-center">
                    <comp-card class="flex w-fit px-4 py-2 space-x-4 items-center">
                        <fw-icon-card
                            class="h-20 w-20"
                            :clickable="false"
                            :animate="false"
                        />
                        <div class="w-fit h-fit">
                            <p class="pl-1 text-xl font-semibold">
                                FurWaz
                            </p>
                            <button
                                class="href"
                                @click="() => openPage('https://furwaz.fr')"
                            >
                                furwaz.fr
                            </button>
                        </div>
                    </comp-card>
                </div>
            </div>
            <div class="mb-20">
                <div class="flex items-center space-x-4 py-2">
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                    <p class="text-xl font-semibold pb-2 whitespace-nowrap">
                        <get-text :context="Lang.CreateTranslationContext('about', 'Thanks')" />
                    </p>
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                </div>
                <div class="flex flex-wrap items-center justify-center">
                    <comp-card class="flex w-fit px-4 py-2 space-x-4 items-center">
                        <cf-icon-card
                            class="h-20 w-20"
                            :clickable="false"
                            :animate="false"
                        />
                        <div class="w-fit h-fit">
                            <p class="pl-1 text-xl font-semibold">
                                Cats & Foxes
                            </p>
                            <button
                                class="href"
                                @click="() => openPage('https://catsandfoxes.com')"
                            >
                                catsandfoxes.com
                            </button>
                        </div>
                    </comp-card>
                </div>
            </div>
            <div>
                <div class="flex items-center space-x-4 py-2">
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                    <p class="text-xl font-semibold pb-2 whitespace-nowrap">
                        <get-text :context="Lang.CreateTranslationContext('about', 'More')" />
                    </p>
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-xl" />
                </div>
                <div class="flex mx-auto w-fit">
                    <get-text :context="Lang.CreateTranslationContext('about', 'MoreDesc')" />
                    <button
                        class="href"
                        @click="() => openPage('https://fullbowody.projects.furwaz.fr')"
                    >
                        <get-text :context="Lang.CreateTranslationContext('about', 'MoreWeb')" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CompIcon from "@/components/CompIcon.vue";
import GetText from '@/components/text/GetText.vue';
import Lang from '@/scripts/Lang';
import CompCard from '@/components/cards/CompCard.vue';
import FwIconCard from '@/components/cards/FwIconCard.vue';
import CfIconCard from '@/components/cards/CfIconCard.vue';

export default {
    name: "About",
    components: {
        CompIcon,
        GetText,
        CompCard,
        FwIconCard,
        CfIconCard
    },
    data() {
        return {
            Lang
        }
    },
    mounted() {},
    methods: {
        openPage(url) {
            ipc.send('open-url', url);
        }
    }
}
</script>
