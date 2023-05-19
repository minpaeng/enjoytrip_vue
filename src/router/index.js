import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import AppPlanBoard from "@/views/plan/AppPlanBoard"
import AppShareBoard from '@/views/share/AppShareBoard.vue'
import AppInfoBoard from '@/views/info/AppInfoBoard'
import InformationDetail from "@/views/info/InformationDetail.vue";
import InformationModify from "@/views/info/InformationModify.vue";
import InformationWrite from "@/views/info/InformationWrite.vue";
import AppMypage from "@/views/mypage/AppMypage";
import AppLogin from "@/views/user/AppLogin";
import AppJoin from "@/views/user/AppJoin";

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
  {
    path: "/login",
    name: "login",
    component: AppLogin
  },
  {
    path: "/join",
    name: "join",
    component: AppJoin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
