<template>
  <b-container fluid class="outer-container">
    <div class="img-container">
      <img class="top-img" src="@/assets/img/main.png" alt="main img" width="100%" height="810" />

      <b-row class="share-container" align-v="center" align-h="start">
        <b-col md="auto"><strong>여행 계획을 세우고 사람들과 공유해요.</strong></b-col>
        <b-col md="auto"><b-button class="share-button">계획 세우기</b-button></b-col>
        <b-col md="auto">
          <b-row class="card-container" align-h="center">
            <h5>top3</h5>
            <top-three-cards id="card-list" />
          </b-row>
        </b-col>
      </b-row>

      <b-container fluid>
        <div id="cards">
          <card-item v-for="index in 10" :key="index" />
        </div>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import TopThreeCards from "@/components/item/TopThreeCards.vue";
import CardItem from "@/components/item/CardItem.vue";
export default {
  name: "AppShareBoard",
  components: {
    TopThreeCards,
    CardItem,
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
/* @import url("@/assets/css/shareboard.css"); */

.outer-container {
  padding-left: 0;
  padding-right: 0;
  margin-top: 70px;
}

.top-img {
  opacity: 0.5;
}

.img-container {
  position: relative;
}

.share-container {
  margin: 0;
  padding-top: 15px;
  position: absolute;
  top: 70px;
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

#cards {
  margin: 0;
  padding: 0;
  margin-top: 30px;
}

.share-button,
.share-button:focus {
  background-color: rgba(69, 113, 180, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.share-button:active,
.share-button:hover {
  background: rgba(50, 92, 156, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
