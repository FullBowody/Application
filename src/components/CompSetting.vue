<template>
    <div class="h-fit w-full">
        <div v-if="setting.type === 'select'">
            <input-choice
                :label="Lang.CreateTranslationContext('settings', setting.name)"
                :list="setting.options()"
                :value="setting.inputValue === undefined ? setting.value() : setting.inputValue"
                :onchange="ev => { setting.inputValue = ev.target.value; setting.onchange(ev.target.value) }"
            />
        </div>
        <div v-if="setting.type === 'number'">
            <input-text
                :label="Lang.CreateTranslationContext('settings', setting.name)"
                :value="setting.inputValue === undefined ? setting.value() : setting.inputValue"
                :onchange="ev => { setting.inputValue = Number(ev.target.value); setting.onchange(Number(ev.target.value)) }"
            />
        </div>
        <div v-if="setting.type === 'string'">
            <input-text
                :label="Lang.CreateTranslationContext('settings', setting.name)"
                :value="setting.inputValue === undefined ? setting.value() : setting.inputValue"
                :onchange="ev => { setting.inputValue = ev.target.value; setting.onchange(ev.target.value) }"
            />
        </div>
        <div v-if="setting.type === 'boolean'">
            <input-switch
                class="mb-0"
                :label="Lang.CreateTranslationContext('settings', setting.name)"
                :value="setting.inputValue === undefined ? setting.value() : setting.inputValue"
                :onchange="ev => { setting.inputValue = ev.target.value; setting.onchange(ev.target.value) }"
            />
        </div>
        <div
            class="flex h-fit w-full pl-2 space-x-4 overflow-hidden transition-all"
            :class="(setting.settings && setting.condition(setting)) ? 'max-h-10': 'max-h-0'"
        >
            <span class="flex grow max-w-[0.25em] rounded-lg bg-slate-600" />
            <div ref="subSettings" class="flex grow h-fit">
                <comp-setting
                    v-for="subSetting in setting.settings"
                    :key="subSetting.name"
                    :setting="subSetting"
                />
            </div>
        </div>
    </div>
</template>

<script>
import InputChoice from '@/components/inputs/InputChoice.vue';
import InputText from '@/components/inputs/InputText.vue';
import InputSwitch from '@/components/inputs/InputSwitch.vue';
import Lang from '@/scripts/Lang';

export default {
    name: "CompSetting",
    components: {
        InputChoice,
        InputText,
        InputSwitch
    },
    props: {
        setting: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            Lang
        }
    },
    methods: {}
}
</script>