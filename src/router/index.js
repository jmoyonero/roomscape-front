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
        path: '/reservas/alta/:id',
        name: 'NewReservation',
        component: () => import('../views/reservations/NewReservation.vue')
    },
    {
        path: '/registro',
        name: 'NewClient',
        component: () => import('../views/clients/NewClient.vue')
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