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
                            <input ref="input-username" type="text" class="outline-none border border-2 border-slate-400 transition-all text-blue-400 text-md font-semibold rounded-md p-0.5 w-full h-fit text-center bg-transparent focus:bg-slate-600/[0.5] focus:border-slate-200">
                        </div>
                    </div>
                    <div class="flex flex-row pt-4 justify-between">
                        <div class="flex flex-col justify-center mr-4 pt-1">
                            <p class="text-lg text-slate-200"> Password : </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <input id="input-password" ref="input-password" type="password" class="outline-none border border-2 border-slate-400 transition-all text-blue-400 text-md font-semibold rounded-md p-0.5 w-full h-fit text-center bg-transparent focus:bg-slate-600/[0.5] focus:border-slate-200">
                        </div>
                    </div>
                    <div ref="log-zone" class="flex grow-0 overflow-hidden h-0 transition-all mt-2">
                        <p class="text-white text-center w-full h-fit min-w-fit font-semibold"></p>
                    </div>
                    <div class="flex flex-row mt-2 justify-between">
                        <text-button :onclick="() => openLink('http://furwaz.com/register')" > Create account </text-button>
                        <flat-button :init="(obj) => setLoginButton(obj)" :onclick="login"> Login </flat-button>
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
                                    <img v-if="User.CurrentUser.icon != ''" :src="User.CurrentUser.icon" alt="user icon" class="h-10 mr-4 rounded-lg border border-2 border-blue-500">
                                    <div v-if="User.CurrentUser.icon == ''">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-1 text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
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
import TextButton from '@/components/TextButton.vue';

let page = null;
let loginButton = null;
function setLoginButton(btn) {
    loginButton = btn;
}

function log(msg) {
    if (page == null) return;
    const zone = page.$refs['log-zone'];
    const p = zone.querySelector('p');
    p.innerHTML = msg;
    zone.style.height = p.getBoundingClientRect().height + 'px';
    setTimeout(() => {
        p.innerHTML = '';
        zone.style.height = '0px';
    }, 2000);
}

function login(btn) {
    if (page == null) return;
    let username = page.$refs["input-username"];
    let password = page.$refs["input-password"];
    
    let valid = true;
    const conditions = [
        {cond: username.value.length > 0, el: username, msg: "Please enter a username"},
        {cond: password.value.length > 0, el: password, msg: "Please provide a password"}
    ];

    for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        if (condition.cond == false) {
            condition.el.focus();
            log(condition.msg);
            valid = false;
            break;
        }
    }

    if (valid == false) return;
    btn.startLoading();
    login_user(username.value, password.value).then(() => {
        btn.stopLoading();
        openLink('/account');
    }).catch((err) => {
        btn.stopLoading();
        log("Error: "+err);
        console.error(err);
    });
}

function login_user(username, password) {
    return new Promise((resolve, reject) => {
        const user = new User({username: username, password: password});
        user.fetchToken().then(() => {
            user.fetchInformations().then(() => {
                resolve();
            }).catch((err) => { reject(err); });
        }).catch(err => { reject(err); });
    });
}

export default {
    name: "Account",
    components: {
        FlatButton,
        TextButton
    },
    methods: { openLink },
    data() {
        page = this;
        return { User, login, setLoginButton };
    },
    setup() {},
    mounted() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "Enter") login(loginButton);
        });
    }
}
</script>