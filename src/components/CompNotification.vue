<template>
    <comp-card
        class="show-up bg-slate-50 dark:bg-slate-700 m-2 p-2 shadow-2xl shadow-black/[0.4] min-w-[16em] max-w-[25em]"
    >
        <div class="flex space-x-2 p-0.5">
            <div class="flex justify-center items-center">
                <div class="bg-slate-200 dark:bg-slate-800 rounded-lg p-1.5">
                    <x-circle-icon
                        v-if="notification.type === 'error'"
                        class="w-5 h-5 text-red-400"
                    />
                    <exclamation-triangle-icon
                        v-if="notification.type === 'warning'"
                        class="w-5 h-5 text-orange-400"
                    />
                    <check-circle-icon
                        v-if="notification.type === 'success'"
                        class="w-5 h-5 text-green-400"
                    />
                    <bell-icon
                        v-if="!notification.type || notification.type === 'info'"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-lg font-semibold whitespace-nowrap text-ellipsis">
                    {{ notification.title }}
                </p>
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
    CheckCircleIcon
} from '@heroicons/vue/24/outline'

export default {
    name: "CompNotification",
    components: {
        CompCard,
        BellIcon,
        ExclamationTriangleIcon,
        CheckCircleIcon,
        XCircleIcon
    },
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    methods: {},
    setup() {},
    mounted() {}
}
</script>