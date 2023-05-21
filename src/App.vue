<template>
  <div id="app">
    <the-header-navbar />
    <router-view :key="$route.fullPath" />
    <footer-comp />
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "App",
  components: {
    TheHeaderNavbar,
    FooterComp,
  },
};
</script>

<style>
#app {
  font-family: Nanum, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
