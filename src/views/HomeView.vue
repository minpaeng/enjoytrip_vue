<template>
  <b-container fluid class="home-container">
    <b-img src="https://picsum.photos/300/100/?image=41" fluid-grow alt="main image"></b-img>
    <!-- <img alt="Vue logo" src="@/assets/main_first.jpg" /> -->

    <b-row class="plan-container">
      <b-row align-v="center" align-h="start">
        <b-col md="auto">여행 계획을 세우고 사람들과 공유해요.</b-col>
        <b-col><b-button>계획 세우기</b-button></b-col>
      </b-row>

      <top-three-cards class="top3-cards" />
    </b-row>

    <b-row class="board-container" align-h="center">
      <div>임시 이미지</div>
      <b-img src="https://picsum.photos/300/200/?image=41" fluid-grow alt="main image"></b-img>
    </b-row>
  </b-container>
</template>

<script>
import TopThreeCards from "@/components/item/TopThreeCards.vue";

export default {
  name: "HomeView",
  components: {
    TopThreeCards,
  },
};
</script>

<style scoped>
.home-container {
  padding-left: 0;
  padding-right: 0;
}

.plan-container {
  margin: 4%;
  margin-top: 10%;
  padding: 15px;
  /* background-color: aqua; */
}

.top3-cards {
  margin-top: 5%;
  margin-bottom: 5%;
}

.board-container {
  margin: 0;
  padding: 0;
  margin-top: 4%;
  margin-bottom: 4%;
}
</style>
