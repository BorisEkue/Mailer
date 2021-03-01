import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '@/views/layout/Main.vue'
import Auth from '@/views/layout/Auth.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
  path: '/auth',
  name: 'Auth',
  component: Auth,
  children: [{
    path: 'login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }]
}, {
  path: '/',
  name: 'App',
  redirect: '/inbox',
  component: Main,
  children: [{
    path: 'inbox',
    name: 'Inbox',
    component: () => import('../views/Inbox.vue')
  }, {
    path: 'outbox',
    name: 'Outbox',
    component: () => import('../views/Outbox.vue')
  }, {
    path: 'email/:type/:id',
    name: 'Email',
    component: () => import('../views/Email.vue')
  }]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
