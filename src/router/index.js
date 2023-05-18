import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '../views/AppHome.vue'
import AppPlanBoard from '../views/AppPlanBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppHome
  },
  {
    path: '/planboard',
    name: 'planboard',
    component: AppPlanBoard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
