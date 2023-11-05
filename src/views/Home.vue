<template>
    <div class="flex grow flex-col justify-center min-w-0 max-w-full p-4">
        <div class="flex flex-row justify-center">
            <div class="flex flex-col justify-start text-sky-500 text-xl">
                <div class="flex justify-center">
                    <comp-icon class="text-sky-500 w-20" />
                </div>
                <h1 class="text-4xl mb-10 font-bold text-center"> FullBowody </h1>
                <div class="text-xl font-semibold text-slate-700 dark:text-slate-200">
                    <get-text :context="Lang.CreateTranslationContext('home', 'ThanksForUsing')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import Lang from '../scripts/Lang';
import CompIcon from '@/components/CompIcon.vue';

export default {
    name: "Home",
    components: {GetText, CompIcon},
    methods: {},
    data() {
        return {
            Lang
        }
    },
    mounted() {
        
    }
}
</script>
