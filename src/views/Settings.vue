<template>
    <div class="flex grow flex-col min-w-0 max-w-full p-4">
        <p class="w-full text-center text-2xl font-semibold">
            <get-text :context="Lang.CreateTranslationContext('settings', 'Title')" />
        </p>
        <div class="flex grow flex-col min-w-0 max-w-full px-4 overflow-x-hidden overflow-y-auto">
            <div class="w-[40em] mx-auto">
                <div
                    v-for="categ in settings"
                    :key="categ.name"
                >
                    <p class="text-xl font-semibold pb-2 pt-4">
                        <get-text :context="Lang.CreateTranslationContext('settings', categ.name)" />
                    </p>
                    <div class="pl-4 pb-1 pt-2">
                        <div
                            v-for="setting in categ.settings"
                            :key="setting.name"
                        >
                            <comp-setting :setting="setting" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex h-0 w-full">
            <div
                class="flex h-fit w-fit flex-col space-y-2 p-4 mx-auto border-2 border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600 rounded-md transition-all"
                :class="settingsModified ? ' translate-y-[-100%] ': ' translate-y-[15%] '"
            >
                <p class="text-center text-xl font-semibold">
                    <get-text :context="Lang.CreateTranslationContext('settings', 'SaveTitle')" />
                </p>
                <log-zone ref="log" />
                <div class="flex h-fit w-full space-x-8 justify-between">
                    <comp-btntext :onclick="revert">
                        <get-text :context="Lang.CreateTranslationContext('verbs', 'Revert')" />
                    </comp-btntext>
                    <comp-btnblock :onclick="save">
                        <get-text :context="Lang.CreateTranslationContext('verbs', 'Save')" />
                    </comp-btnblock>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GetText from '@/components/text/GetText.vue';
import Lang from '@/scripts/Lang';
import CompBtnblock from '@/components/inputs/CompBtnblock.vue';
import CompBtntext from '@/components/inputs/CompBtntext.vue';
import { settings } from '@/scripts/settings';
import LogZone from '@/components/cards/LogZone.vue';
import { Log } from '@/scripts/Logs';
import CompSetting from '@/components/CompSetting.vue';

function saveSetting(setting, log) {
    try {
        const topResult = setting.save(setting.inputValue === undefined ? setting.value() : setting.inputValue) === false ? false : true;
        const botResult = setting.settings && setting.condition(setting)
            ? setting.settings.every(subSetting => saveSetting(subSetting, log))
            : true;
        if (!topResult || !botResult) {
            Lang.GetText(Lang.CreateTranslationContext('settings', 'UnknownErrorSaving'), text => log.update(text, Log.ERROR));
            return false;
        }
    } catch (err) {
        Lang.GetText(Lang.CreateTranslationContext('settings', 'ErrorSaving'), text => log.update(text + err.message, Log.ERROR));
        return false;
    }
    return true;
}

function isModified(setting) {
    const baseCheck = (setting.inputValue !== undefined && setting.inputValue !== setting.value());
    const subCheck = setting.settings && setting.condition(setting)
        ? setting.settings.some(subSetting => isModified(subSetting))
        : false;
    return baseCheck || subCheck;
}

function resetSetting(setting) {
    setting.inputValue = undefined;
    if (setting.settings && setting.condition(setting))
        setting.settings.forEach(subSetting => resetSetting(subSetting));
}

export default {
    name: "Settings",
    components: {
        GetText,
        CompBtnblock,
        CompBtntext,
        LogZone,
        CompSetting
    },
    methods: {},
    data() {
        return {
            Lang,
            settings
        }
    },
    computed: {
        settingsModified() {
            return this.settings.some(categ => {
                return categ.settings.some(setting => {
                    return isModified(setting);
                });
            });
        }
    },
    mounted() {
        
    },
    methods: {
        save() {
            const logZone = this.$refs['log'];
            const log = logZone.log('', Log.INFO);
            Lang.GetText(Lang.CreateTranslationContext('verbs', 'Saving'), text => log.update(text));

            const result = this.settings.every(categ => {
                return categ.settings.every(setting => {
                    return saveSetting(setting, log)
                });
            });
            
            if (result)
                Lang.GetText(Lang.CreateTranslationContext('verbs', 'Saved'), text => log.update(text, Log.SUCCESS));

            setTimeout(() => {
                if (result) {
                    this.settings.forEach(categ => categ.settings.forEach(setting => resetSetting(setting)));
                }
                log.delete();
            }, result ? 1000 : 4000);
        },
        revert() {
            // this.$router.go();
            this.settings.forEach(categ => {
                categ.settings.forEach(setting => {
                    setting.inputValue = undefined;
                });
            });
        }
    }
}
</script>
