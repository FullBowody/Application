<template>
    <div class="flex flex-col grow min-h-0">
        <div class="flex flex-col grow min-h-0">
            <bar-title class="mt-2"> Connected Extensions </bar-title>
            <div class="flex grow flex-wrap p-2 min-h-0 overflow-auto">

                <div ref="extensions" v-for="ext in this.extensions" class="p-2 m-2 w-fit h-fit rounded-lg border border-2 border-slate-600 shadow-lg">
                    <div class="w-fit h-fit mx-auto text-blue-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                        </svg>
                    </div>
                    <div class="w-fit mx-auto">
                        <p class="text-center text-xl text-blue-500 font-semibold"> {{ ext.name ?? "Unknown name" }} </p>
                        <div class="flex justify-between space-x-2">
                            <p class="text-left text-base text-slate-400 font-semibold"> IP : </p>
                            <p class="text-left text-base text-slate-400 font-semibold"> {{ ext.ip ?? "Unknown ip" }} </p>
                        </div>
                        <div class="flex justify-between space-x-2">
                            <p class="text-left text-base text-slate-400 font-semibold"> PORT : </p>
                            <p class="text-left text-base text-slate-400 font-semibold"> {{ ext.port ?? "Unknown port" }} </p>
                        </div>
                    </div>
                    <div class="w-fit mx-auto">
                        <div class="flex flex-row mt-2 px-2 py-1 text-red-600/[0.8] bg-red-600/[0.1] border border-2 border-red-600/[0.2] hover:border-red-600/[0.5] hover:bg-red-600/[0.2] hover:text-red-600 rounded-lg cursor-pointer transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <div class="flex flex-col justify"> <p class="text-base font-semibold" v-on:click="ext.disconnect()" > Disconnect </p> </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div ref="server" class="flex flex-row justify-between bg-slate-600 p-1">
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> Extension server </p> </div>
                <!--
                <div class="flex flex-col justify-center">
                    <p ref="toogle-btn" v-on:click="toogleServer()"
                        class="text-blue-500 bg-black/[0.1] text-md font-semibold border-2 border-transparent rounded py-0 px-2
                        cursor-pointer hover:border-blue-500 hover:bg-blue-500/[0.1] transition-all"> Start </p>
                </div>
                -->
            </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold">State : </p> </div>
                <div class="flex flex-col justify-center">
                    <span class="hidden border-red-600 border-green-600 border-orange-600 bg-red-600/[0.2] bg-orange-600/[0.2] bg-green-600/[0.2] text-green-500 text-orange-500 text-red-500 "></span> <!-- for tailwind to generate css colors -->
                    <span
                        class="text-sm font-semibold border border-2 px-1 py-0.5 rounded-lg mt-1"
                        :class="`border-${this.server.color}-600 bg-${this.server.color}-600/[0.2] text-${this.server.color}-500 `"
                        > {{ this.server.state ?? "-- -- -- --" }} </span>
                </div>
            </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> IP :  </p> </div>
                <div class="flex flex-col justify-center"> <p class="mt-1 text-blue-500 text-base font-semibold"> {{ this.server.ip ?? "---.---.---.---" }} </p> </div>
            </div>
            <div class="flex flex-row space-x-2">
                <div class="flex flex-col justify-center"> <p class="text-slate-400 text-xl font-bold"> Port :  </p> </div>
                <div class="flex flex-col justify-center"> <p class="mt-1 text-blue-500 text-base font-semibold"> {{ this.server.port ?? "----" }} </p> </div>
            </div>
        </div>
    </div>
</template>

<script>
import FlatButton from '@/components/FlatButton.vue';
import BarTitle from '../components/BarTitle.vue';
import Router from '../scripts/Router';

let toogleBtn = null;
let page = null;
let serverState = {};
let extensions = [];

function updateServerButton() {
    if (toogleBtn == null) return;
    switch (serverState.state.toLowerCase()) {
        case "started":
            toogleBtn.innerText = "Stop";
            break;
        case "starting":
            toogleBtn.innerText = "Starting ...";
            break;
        case "stopped":
            toogleBtn.innerText = "Start";
            break;
        case "stopping":
            toogleBtn.innerText = "Stopping ...";
            break;
        default:
            break;
    }
}

function updateServerState() {
    return new Promise((resolve, reject) => {
        Router.routes.getExtensionServerInfos.send().then(res => {
            serverState = res;
            serverState.color = res.state == "Started" ? "green" : res.state == "Stopped" ? "orange" : res.state == "Error"? "red" : "blue";
            page.server = serverState;
            if (page != null) page.$forceUpdate();
            updateServerButton();
            resolve();
        }).catch(err => { console.log("error: ", err); });
    });
}

function toogleServer() {
    if (serverState.state == "Started") {
        serverState.state = "Stopping";
        updateServerState();
        Router.routes.stopExtensionServer.send().then(res => {
            updateServerState();
        }).catch(err => { console.log("error: ", err) });
    } else if (serverState.state == "Stopped") {
        serverState.state = "Starting";
        updateServerState();
        Router.routes.startExtensionServer.send().then(res => {
            updateServerState();
        }).catch(err => console.error("error: ", err));
    }
}

function updateExtensions() {
    return new Promise((resolve, reject) => {
        Router.routes.getExtensions.send().then(res => {
            extensions.splice(0, extensions.length);
            res.forEach(ext => {
                extensions.push(ext);
                ext.disconnect = () => {
                    Router.routes.disconnectExtension.send({id: ext.id}).then(res => {
                        if (res) {
                            extensions.splice(this.extensions.findIndex(val => val.id == ext.id), 1);
                            if (page != null) {
                                page.extensions = extensions;
                                page.$forceUpdate();
                            }
                        }
                    });
                }
            });
            if (page != null) {
                page.extensions = extensions;
                page.$forceUpdate();
            }
            resolve();
        }).catch(err => console.error("Error: ", err));
    });
}

export default {
    name: "Extensions",
    components: { BarTitle, FlatButton },
    methods: { toogleServer },
    data() { return {extensions: extensions, server: serverState} },
    setup() {},
    mounted() {
        toogleBtn = this.$refs["toogle-btn"];
        page = this;

        // get extensions server state
        updateServerState().then(() => {
            if (serverState.state != "Started") {
                Router.routes.startExtensionServer.send().then(res => {
                    updateServerState();
                }).catch(err => console.error("error: ", err));
            }
        });
        setInterval(() => { updateExtensions(); }, 500);
    }
}
</script>