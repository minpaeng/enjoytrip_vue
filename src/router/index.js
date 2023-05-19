import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/views/AppHome'
import AppPlanBoard from "@/views/plan/AppPlanBoard"
import AppShareBoard from '@/views/share/AppShareBoard'
import AppInfoBoard from '@/views/info/AppInfoBoard'
import InformationDetail from "@/views/info/InformationDetail";
import InformationModify from "@/views/info/InformationModify";
import InformationWrite from "@/views/info/InformationWrite";
import AppMypage from "@/views/mypage/AppMypage";
import PlanCreate from "@/views/plan/PlanCreate";

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
    path: '/plancreate',
    name: 'plancreate',
    component: PlanCreate
  },
  {
    path: '/shareboard',
    name: 'shareboard',
    component: AppShareBoard
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
