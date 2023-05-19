<template>
  <header>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="primary" class="header-navbar">
      <b-navbar-brand to="/"
        ><font-awesome-icon :icon="['fas', 'suitcase']" /> EnjoyTrip</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/planboard"
            ><font-awesome-icon :icon="['fas', 'pen']" fade /> 여행 계획</b-nav-item
          >
          <b-nav-item href="/shareboard"
            ><font-awesome-icon :icon="['fas', 'people-arrows']" fade /> 후기 공유</b-nav-item
          >
          <b-nav-item to="/infoboard"
            ><font-awesome-icon :icon="['fas', 'clipboard']" fade /> 자유 게시판</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <strong>권민정 님</strong>
            </template>
            <b-dropdown-item to="/mypage">마이페이지</b-dropdown-item>
            <b-dropdown-item href="#">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "TheHeaderNavbar",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.header-navbar {
  background-color: #116fad !important;
  padding: 15px;
}
</style>
