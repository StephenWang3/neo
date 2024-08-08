import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/result',
            name: 'result',
            component: () => import('@/pages/result/index.vue')
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})