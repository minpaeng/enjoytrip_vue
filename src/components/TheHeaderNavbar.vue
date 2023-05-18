<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="header-navbar">
      <b-navbar-brand href="#"
        ><font-awesome-icon :icon="['fas', 'suitcase']" /> EnjoyTrip</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><font-awesome-icon :icon="['fas', 'pen']" fade /> 여행 계획</b-nav-item
          >
          <b-nav-item href="#">후기 공유</b-nav-item>
          <b-nav-item href="#">지유 게시판</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <strong>권민정 님</strong>
            </template>
            <b-dropdown-item href="#">마이페이지</b-dropdown-item>
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
  background-color: #155b8a !important;
  padding: 15px;
}
</style>
