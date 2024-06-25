<template>
    <comp-card
        class="flex flex-col p-2 h-full min-w-[10em] max-w-[20em] space-y-2 shadow-xl"
        :classes="'min-w-min'"
    >
        <div class="flex w-fit space-x-2 p-2">
            <div class="flex h-fit w-fit rounded-lg p-2 bg-slate-200 dark:bg-slate-800">
                <Squares2X2Icon class="h-6 w-6 text-slate-900 dark:text-slate-200" />
            </div>
            <div class="flex grow text-lg font-semibold justify-center items-center">
                <p> {{ plugin.name }} </p>
            </div>
        </div>
        <div class="flex p-1">
            <p class="text-base"> {{ plugin.description }} </p>
        </div>
        <div class="flex flex-col p-1">
            <div class="flex justify-start space-x-2">
                <p class="flex w-fit h-fit text-slate-600 dark:text-slate-400">
                    <get-text :context="Lang.CreateTranslationContext('account', 'Author')" /> :
                </p>
                <p class="flex w-fit h-fit">
                    {{ plugin.author }}
                </p>
            </div>
            <div class="flex justify-start space-x-2">
                <p class="flex w-fit h-fit text-slate-600 dark:text-slate-400">
                    <get-text :context="Lang.CreateTranslationContext('account', 'Version')" /> :
                </p>
                <p class="flex w-fit h-fit">
                    {{ plugin.version }}
                </p>
            </div>
        </div>
        <div class="flex justify-between pt-4">
            <button></button>
            <comp-btnblock :disabled="true">
                <get-text :context="Lang.CreateTranslationContext('verbs', 'Delete')" />
            </comp-btnblock>
        </div>
    </comp-card>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import CompCard from '@/components/cards/CompCard.vue';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import Lang from '@/scripts/Lang';

import {
    Squares2X2Icon
} from '@heroicons/vue/24/outline';

export default {
    name: "CompPlugin",
    components: {
        GetText,
        CompCard,
        CompBtnblock,
        Squares2X2Icon
    },
    props: {
        plugin: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            Lang
        }
    },
    methods: {
        
    }
}
</script>