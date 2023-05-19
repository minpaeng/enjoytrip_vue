<template>
  <b-container fluid class="outer-container">
    <div class="img-container">
      <img class="top-img" src="@/assets/img/main.png" alt="main img" width="100%" height="810" />

      <b-row class="plan-container" align-v="center" align-h="start">
        <b-col md="auto">여행 계획을 세우고 사람들과 공유해요.</b-col>
        <b-col md="auto"><b-button>계획 세우기</b-button></b-col>
        <b-col md="auto">
          <b-row class="card-container" align-h="center">
            <h5>top3</h5>
            <top-three-cards id="card-list" />
          </b-row>
        </b-col>
      </b-row>

      <b-container>
        <div>
          <h4>fdgfdgdfg</h4>
        </div>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import TopThreeCards from "@/components/item/TopThreeCards.vue";

export default {
  name: "AppPlanBoard",
  components: {
    TopThreeCards,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
/* @import url("@/assets/css/common.css"); */
/* @import url("@/assets/css/planboard.css"); */

.outer-container {
  padding-left: 0;
  padding-right: 0;
}

.top-img {
  opacity: 0.5;
}

.img-container {
  position: relative;
}

.plan-container {
  margin: 0;
  padding-top: 15px;
  position: absolute;
  top: 5%;
  left: 5%;
}

h5 {
  margin-bottom: 20px;
}

.card-container {
  margin: 3%;
  margin-right: 8%;
}

#card-list {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
