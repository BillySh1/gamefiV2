import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/mint',
            component: () => import('../pages/mint/mint.vue')
        }
       
    ]
})

export default router


