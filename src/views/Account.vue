<template>
    <div class="flex grow">
        <div v-if="User.CurrentUser == null" class="flex grow flex-col justify-center">
            <div class="flex flex-row justify-center p-4 rounded-lg border border-2 border-slate-600 shadow-lg mx-auto">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-row justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-20 h-20 text-blue-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div class="flex flex-col justify-center"> <h3 class="text-2xl font-bold text-blue-500"> Login </h3> </div>
                    </div>

                    <h3 class="text-center text-lg font-semibold text-slate-500"> Please login to see your account </h3>
                    <div class="flex flex-row pt-8 justify-between">
                        <div class="flex flex-col justify-center mr-4 pt-1">
                            <p class="text-lg text-slate-200"> Username : </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <input type="text" class="outline-none border border-2 border-slate-300 transition-all text-blue-400 text-md font-semibold rounded-md p-0.5 w-full h-fit text-center bg-transparent focus:bg-slate-600/[0.5] focus:border-slate-200">
                        </div>
                    </div>
                    <div class="flex flex-row pt-4 justify-between">
                        <div class="flex flex-col justify-center mr-4 pt-1">
                            <p class="text-lg text-slate-200"> Password : </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <input type="password" class="outline-none border border-2 border-slate-300 transition-all text-blue-400 text-md font-semibold rounded-md p-0.5 w-full h-fit text-center bg-transparent focus:bg-slate-600/[0.5] focus:border-slate-200">
                        </div>
                    </div>
                    <div class="flex flex-row pt-4 justify-between">
                        <div class="flex flex-col justify-center">
                            <p class="text-blue-500 hover:text-blue-400 cursor-pointer" v-on:mousedown="openLink('http://furwaz.com/register')">Create account</p>
                        </div>
                        <div class="flex justify-center border border-2 border-blue-500/[0.4] select-none cursor-pointer bg-slate-600 text-slate-400 hover:text-slate-200 hover:border-blue-500 px-3 py-0.5 transition-all">
                            <p class="text-lg text-center font-semibold m-0 p-0">
                                Login
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="User.CurrentUser != null" class="flex grow flex-col justify-center">
            <div class="flex flex-row justify-center">
                <div class="flex flex-col">
                    <div class="flex flex-row">
                        <div class="flex flex-col justify-center mr-4"> <h3 class="text-xl font-bold text-slate-200"> Connected to : </h3> </div>
                        <div class="flex flex-row justify-center pr-4 p-1.5 bg-slate-600 rounded-lg mx-auto">
                            <div class="flex flex-col justify-between">
                                <div class="flex flex-row">
                                    <img :src="User.CurrentUser.icon" alt="user icon" class="h-10 mr-4 rounded-lg border border-2 border-blue-500">
                                    <div class="flex flex-col justify-center"> <h3 class="text-xl font-bold text-blue-500"> {{ User.CurrentUser.username }} </h3> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <flat-button class="w-full" :onclick="() => { User.forget(); openLink('/account'); }">Log out</flat-button>
                    </div>
                    <div class="flex flex-col grow-0 h-fit px-4 mt-2 rounded-lg border border-2 border-slate-600">
                        <h3 class="text-xl text-slate-500 text-center w-fit mx-auto"> Activated addons </h3>
                        <div class="flex grow flex-row justify-center space-y-2 h-[50vh]">
                            <div class="flex grow flex-col justify-center">
                                <p class="text-center text-lg font-semibold text-slate-400"> No addons yet :/ </p>
                                <p class="text-center text-base font-semibold text-blue-500 hover:text-blue-400 cursor-pointer" v-on:mousedown="openLink('http://furwaz.com/fullbowody/addons')"> See available addons </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { openLink } from "../scripts/common";
import User from '../scripts/User';
import FlatButton from '../components/FlatButton';

export default {
    name: "Account",
    components: {
        FlatButton
    },
    methods: { openLink },
    data() { return { User } },
    setup() {},
    mounted() {}
}
</script>