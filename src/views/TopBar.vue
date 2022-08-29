<template>
    <div class="flex flex-row w-full bg-slate-800">
        <div class="flex grow">
            <top-bar-button :onclick="btn => setClickedButton(this, 'btn-home')" ref="btn-home"> Home </top-bar-button>
            <top-bar-button :onclick="btn => setClickedButton(this, 'btn-tracking')" ref="btn-tracking"> Tracking </top-bar-button>
            <top-bar-button :onclick="btn => setClickedButton(this, 'btn-extensions')" ref="btn-extensions"> Extensions </top-bar-button>
            <top-bar-button :onclick="btn => setClickedButton(this, 'btn-settings')" ref="btn-settings"> Settings </top-bar-button>
            <top-bar-button :onclick="btn => setClickedButton(this, 'btn-about')" ref="btn-about"> About </top-bar-button>
        </div>
        <account-button :onclick="btn => setClickedButton(this, 'btn-account')" ref="btn-account"></account-button>
    </div>
</template>

<script>
import TopBarButton from '../components/TopBarButton.vue';
import AccountButton from '../components/AccountButton.vue';

let selectedTab = "";
function setClickedButton(obj, btn) {
    if (selectedTab == btn) return;
    selectedTab = btn;

    Object.keys(obj.$refs).forEach(key => {
        obj.$refs[key].setSelected(key == btn);
    });
    obj.onchange(btn.split("-")[1]);
}

export default {
    name: "TopBar",
    props: {
        onchange: {
            type: Function,
            default: (name) => {}
        }
    },
    components: {
        TopBarButton,
        AccountButton
    },
    methods: {
        setClickedButton
    },
    mounted() {
        const id = "btn-" + window.location.href.split("/")[3];
        if (id == "btn-") {
            window.location.href = "/home";
            return;
        }
        this.$refs[id].setSelected(true);
    }
}
</script>