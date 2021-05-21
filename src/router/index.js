import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/escape-rooms/listado',
        name: 'ListEscapeRooms',
        component: () => import('../views/escape-rooms/ListEscapeRooms.vue')
    },
    {
        path: '/registro',
        name: 'NewClient',
        component: () => import('../views/clients/NewClient.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/UserLogin.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/login/UserLogOut.vue')
    },
    {
        path: '/*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router