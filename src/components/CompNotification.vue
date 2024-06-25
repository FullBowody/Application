<template>
    <comp-card
        class="notif-card bg-slate-50 dark:bg-slate-700 mx-2 px-2 max-h-[0em] shadow-2xl shadow-black/[0.4] min-w-[16em] max-w-[25em]"
        :class="notification.deleted? 'hide-down max-h-[0em] my-0 py-0 border-0' : 'show-up max-h-[15em] my-2 py-2 border-2'"
    >
        <div class="flex space-x-2 p-0.5">
            <div class="flex justify-center items-center">
                <div class="bg-slate-200 dark:bg-slate-800 rounded-lg p-1.5">
                    <x-circle-icon
                        v-if="notification.type === 'error'"
                        class="wiggle w-5 h-5 text-red-400"
                    />
                    <exclamation-triangle-icon
                        v-if="notification.type === 'warning'"
                        class="wiggle w-5 h-5 text-orange-400"
                    />
                    <check-circle-icon
                        v-if="notification.type === 'success'"
                        class="wiggle w-5 h-5 text-green-400"
                    />
                    <bell-icon
                        v-if="!notification.type || notification.type === 'info'"
                        class="wiggle w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-lg font-semibold whitespace-nowrap text-ellipsis">
                    {{ notification.title }}
                </p>
            </div>
            <div class="flex grow justify-end items-center">
                <button
                    class="p-1 rounded text-slate-400 dark:text-slate-500 hover:bg-slate-200 hover:dark:bg-slate-600 hover:text-slate-900 hover:dark:text-slate-200 transition-colors"
                    @click="notification.delete"
                >
                    <x-mark-icon
                        class="w-5 h-5"
                        @click="notification.delete"
                    />
                </button>
            </div>
        </div>
        <span class="flex bg-slate-200 dark:bg-slate-600 w-full h-1 rounded-full my-2" />
        <div class="p-1">
            <p class="text-sm">
                {{ notification.message }}
            </p>
        </div>
    </comp-card>
</template>

<script>
import CompCard from './cards/CompCard.vue'
import {
    BellIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    XMarkIcon,
    CheckCircleIcon
} from '@heroicons/vue/24/outline'

export default {
    name: "CompNotification",
    components: {
        CompCard,
        BellIcon,
        ExclamationTriangleIcon,
        CheckCircleIcon,
        XCircleIcon,
        XMarkIcon
    },
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    methods: {},
    setup() {},
    mounted() {
        this.notification.setVue(this);
    }
}
</script>

<style>
@keyframes wiggle {
    0% { transform: rotate(0deg) }
    15% { transform: rotate(5deg) }
    30% { transform: rotate(-10deg) }
    45% { transform: rotate(15deg) }
    60% { transform: rotate(-10deg) }
    75% { transform: rotate(5deg) }
    90% { transform: rotate(0deg) }
}

.wiggle {
    animation: wiggle 1s;
}

.notif-card {
    transition: max-height 1s, margin 1s, padding 1s;
}
</style>