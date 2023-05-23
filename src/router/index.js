import Vue from "vue";
import VueRouter from "vue-router";
import AppHome from "@/views/AppHome";
import AppPlanBoard from "@/views/plan/AppPlanBoard";
import AppShareBoard from "@/views/share/AppShareBoard";
import ShareBoardDetail from "@/views/share/ShareBoardDetail";
import AppInfoBoard from "@/views/info/AppInfoBoard";
import InformationDetail from "@/views/info/InformationDetail";
import InformationModify from "@/views/info/InformationModify";
import InformationWrite from "@/views/info/InformationWrite";
import AppMypage from "@/views/mypage/AppMypage";
import PlanCreate from "@/views/plan/PlanCreate";
import PlanDetail from "@/views/plan/PlanDetail";
import PlanModify from "@/views/plan/PlanModify";
import AppLogin from "@/views/user/AppLogin";
import AppJoin from "@/views/user/AppJoin";
import ShareCreate from "@/views/share/ShareCreate"

import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인 해주세요.");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 완료");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHome,
  },
  {
    path: "/planboard",
    name: "planboard",
    beforeEnter: onlyAuthUser,
    component: AppPlanBoard,
  },
  {
    path: "/plancreate",
    name: "plancreate",
    beforeEnter: onlyAuthUser,
    component: PlanCreate,
  },
  {
    path: "/planDetail/:no",
    name: "planDetail",
    component: PlanDetail,
  },
  {
    path: "/planModify/:no",
    name: "planModify",
    beforeEnter: onlyAuthUser,
    component: PlanModify,
  },
  {
    path: "/shareboard",
    name: "shareboard",
    component: AppShareBoard,
  },
  {
    path: "/shareboard/create",
    name: "sharecreate",
    component: ShareCreate,
  },
  {
    path: "/shareboard/detail/:no",
    name: "shareboarddetail",
    component: ShareBoardDetail,
  },
  {
    path: "/infoboard",
    name: "infoboard",
    component: AppInfoBoard,
  },
  {
    path: "/infoboard/write",
    name: "infowrite",
    beforeEnter: onlyAuthUser,
    component: InformationWrite,
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
    beforeEnter: onlyAuthUser,
    component: AppMypage,
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
  },
  {
    path: "/join",
    name: "join",
    component: AppJoin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
