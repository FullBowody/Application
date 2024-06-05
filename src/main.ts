import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import "./style.css";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
        // { path: '/cameras', name: 'Cameras', component: () => import('./views/-!-Cameras.vue') },
        { path: '/scene', name: 'Scene', component: () => import('./views/Scene.vue') },
        { path: '/listeners', name: 'Listeners', component: () => import('./views/Listeners.vue') },
        { path: '/account', name: 'Account', component: () => import('./views/Account.vue') },
        { path: '/about', name: 'About', component: () => import('./views/About.vue') },
        { path: '/settings', name: 'Settings', component: () => import('./views/Settings.vue') }
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    });
