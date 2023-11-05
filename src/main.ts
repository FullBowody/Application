import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
        { path: '/cameras', name: 'Cameras', component: () => import('./views/Cameras.vue') },
        { path: '/tracking', name: 'Tracking', component: () => import('./views/Tracking.vue') },
        { path: '/extensions', name: 'Extensions', component: () => import('./views/Extensions.vue') },
        { path: '/account', name: 'Account', component: () => import('./views/Account.vue') },
        { path: '/about', name: 'About', component: () => import('./views/About.vue') },
        { path: '/settings', name: 'Settings', component: () => import('./views/Settings.vue') }
    ]
});

// load settings

createApp(App).use(router).mount('#app');