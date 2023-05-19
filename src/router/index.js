import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import AppPlanBoard from '@/views/AppPlanBoard.vue'
import AppInfoBoard from '@/views/AppInfoBoard'
import InformationDetail from "@/views/InformationDetail.vue";
import InformationModify from "@/views/InformationModify.vue";
import InformationWrite from "@/views/InformationWrite.vue";
import AppMypage from "@/views/AppMypage";

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
  {
    path: '/infoboard',
    name: 'infoboard',
    component: AppInfoBoard
  },
  {
    path: '/infoboard/write',
    name: 'infowrite',
    component: InformationWrite
  },
  {
    path: "/infoboard/detail/:no",
    name: "infoDetail",
    component: InformationDetail,
  },
  {
    path: "/infoboard/modify/:no",
    name: "infoModify",
    component: InformationModify,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: AppMypage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
