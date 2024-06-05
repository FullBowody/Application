<template>
    <comp-card class="h-fit w-64 p-0 overflow-hidden bg-slate-50 dark:bg-slate-700">
        <div class="flex grow relative">
            <div
                class="flex absolute w-[50%] h-full z-0 transition-all p-1"
                :class="viewMode === '3Dview'? '': 'translate-x-[7.9em]'"
            >
                <span class="flex grow bg-sky-500 dark:bg-sky-600 rounded-md border-2 border-sky-600 dark:border-sky-500" />
            </div>
            <button
                class="flex w-1/2 h-full justify-center items-center p-2 z-50"
                @click="setViewMode('3Dview')"
            >
                <p
                    class="whitespace-nowrap text-ellipsis overflow-hidden transition-all"
                    :class="viewMode === '3Dview'? 'text-slate-50 font-bold': 'text-slate-600 dark:text-slate-200 font-base'"
                >
                    <get-text :context="Lang.CreateTranslationContext('scene', '3DView')" />
                </p>
            </button>
            <button
                class="flex w-1/2 h-full justify-center items-center p-2 z-50"
                @click="setViewMode('Camera')"
            >
                <p
                    class="whitespace-nowrap text-ellipsis overflow-hidden transition-all"
                    :class="viewMode === 'Camera'? 'text-slate-50 font-bold': 'text-slate-600 dark:text-slate-200 font-base'"
                >
                    <get-text :context="Lang.CreateTranslationContext('scene', 'Cameras')" />
                </p>
            </button>
        </div>
        <div
            class="flex h-fit transition-all overflow-hidden px-2"
            :class="viewMode === 'Camera'? 'max-h-[4em]': 'max-h-[0em]'"
        >
            <div class="flex w-full border-t-2 border-slate-200 dark:border-slate-600 z-50 px-2">
                <input-choice
                    :label="Lang.CreateTranslationContext('scene', 'Camera')"
                    :list="[{name: 'Camera 1', value: 'cam1'}, {name: 'Camera 2', value: 'cam2'}]"
                    :value="'cam1'"
                />
            </div>
        </div>
    </comp-card>
</template>

<script>
import CompCard from '@/components/cards/CompCard.vue';
import InputChoice from '@/components/inputs/InputChoice.vue';
import GetText from '@/components/text/GetText.vue';
import Lang from '@/scripts/Lang';

export default {
    name: "CompSetting",
    components: {
        CompCard,
        InputChoice,
        GetText
    },
    props: {
        
    },
    data() {
        return {
            Lang,
            viewMode: '3Dview'
        }
    },
    methods: {
        setViewMode(mode) {
            this.viewMode = mode;
        }
    }
}
</script>