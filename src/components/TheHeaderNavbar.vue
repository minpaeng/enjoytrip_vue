<template>
  <header>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="primary" class="header-navbar">
      <b-navbar-brand to="/" id="nav-title"><font-awesome-icon :icon="['fas', 'suitcase']" /> EnjoyTrip</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/planboard"><font-awesome-icon :icon="['fas', 'pen']" fade /> 여행 계획</b-nav-item>
          <b-nav-item href="/shareboard"><font-awesome-icon :icon="['fas', 'people-arrows']" fade /> 후기 공유</b-nav-item>
          <b-nav-item to="/infoboard"><font-awesome-icon :icon="['fas', 'clipboard']" fade /> 자유 게시판</b-nav-item>
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <strong>{{ userInfo.userId }} 님</strong>
            </template>
            <b-dropdown-item to="/mypage">마이페이지</b-dropdown-item>
            <b-dropdown-item @click.prevent="onClickLogout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people"></b-icon>
            </template>
            <b-dropdown-item :to="{ name: 'join' }" class="link"><b-icon icon="person-circle"></b-icon> 회원가입 </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'login' }" class="link"><b-icon icon="key"></b-icon> 로그인 </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onClickLogout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

#nav-title {
  font-family: "Jua";
}

.header-navbar {
  background-color: #116fad !important;
  padding: 15px;
}

#nav-collapse {
  /* font-family: "Nanum Gothic Coding"; */
  font-family: "Jua";
}

.link {
  text-decoration: none;
}
</style>
