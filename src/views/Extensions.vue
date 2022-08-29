<template>
    <div class="flex flex-col grow">
        <div class="flex flex-col grow">
            <bar-title class="mt-2"> Connected Extensions </bar-title>
            <div class="flex grow wrap p-4">
                <div class="p-2 w-fit h-fit rounded-lg border border-2 border-slate-600 shadow-lg">
                    <div class="w-fit h-fit mx-auto bg-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-20 h-20 text-slate-700" fill="currentColor">
                        <path d="M9.406 17.183c.431-1.025-.05-2.206-1.076-2.637l-1.762-.741c.331-.125.654-.182.982-.183 1.518 0 2.765 1.236 2.779 2.754.014 1.538-1.217 2.792-2.753 2.806-1.159.005-2.138-.684-2.571-1.665l1.763.741c1.027.432 2.207-.05 2.638-1.075zm-9.406-17.183v11.043l5.585 2.349c.596-.39 1.283-.599 2.046-.583l3.017-4.221c.048-2.541 2.122-4.588 4.674-4.588 2.583 0 4.678 2.094 4.678 4.677 0 2.581-2.098 4.703-4.732 4.675l-4.115 3.067-.009.004c-.012 1.962-1.593 3.558-3.561 3.577-1.777.015-3.234-1.249-3.56-2.895l-4.023-1.692v8.587h24v-24h-24zm15.322 11.857c-1.752 0-3.179-1.427-3.179-3.18 0-1.753 1.427-3.179 3.179-3.179 1.753 0 3.179 1.426 3.179 3.179s-1.425 3.18-3.179 3.18zm0-.779c1.325 0 2.401-1.077 2.401-2.401 0-1.323-1.076-2.401-2.401-2.401-1.324 0-2.401 1.078-2.401 2.401 0 1.324 1.078 2.401 2.401 2.401z"/>
                        </svg>
                    </div>
                    <div class="w-fit mx-auto">
                        <p class="text-center text-xl text-blue-500 font-semibold"> Steam VR </p>
                        <div class="flex justify-between space-x-2">
                            <p class="text-left text-base text-slate-400 font-semibold"> IP : </p>
                            <p class="text-left text-base text-slate-400 font-semibold"> 192.168.1.42 </p>
                        </div>
                        <div class="flex justify-between space-x-2">
                            <p class="text-left text-base text-slate-400 font-semibold"> PORT : </p>
                            <p class="text-left text-base text-slate-400 font-semibold"> 1342 </p>
                        </div>
                    </div>
                    <div class="w-fit mx-auto">
                        <div class="flex flex-row mt-2 px-2 py-1 text-red-600/[0.8] bg-red-600/[0.1] border border-2 border-red-600/[0.2] hover:border-red-600/[0.5] hover:bg-red-600/[0.2] hover:text-red-600 rounded-lg cursor-pointer transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <div class="flex flex-col justify"> <p class="text-base font-semibold">Déconnecter</p> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-between bg-slate-600 p-1">
            <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> Extension server </p> </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold">State : </p> </div>
                <div class="flex flex-col justify-center">
                    <span class="text-sm font-semibold border border-2 border-green-600 bg-green-600/[0.2] text-green-500 px-1 py-0.5 rounded-lg mt-1"> Running </span>
                </div>
            </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> IP :  </p> </div>
                <div class="flex flex-col justify-center"> <p class="mt-1 text-blue-500 text-base font-semibold"> 192.168.1.42 </p> </div>
            </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> Port :  </p> </div>
                <div class="flex flex-col justify-center"> <p class="mt-1 text-blue-500 text-base font-semibold"> 5621 </p> </div>
            </div>
        </div>
    </div>
</template>

<script>
import FlatButton from '@/components/FlatButton.vue';
import BarTitle from '../components/BarTitle.vue';

export default {
    name: "Extensions",
    components: { BarTitle, FlatButton },
    methods: {},
    setup() {},
    mounted() {}
}
</script>