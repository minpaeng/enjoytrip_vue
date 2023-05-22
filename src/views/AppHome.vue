<template>
  <b-container fluid class="outer-container">
    <div id="main-img">
      <b-card
        overlay
        :img-src="require('@/assets/img/main.png')"
        img-height="200px"
        img-alt="Card Image"
        text-variant="white"
        title="Enjoy Trip"
        sub-title="여행 계획, 일정 공유"
        sub-title-text-variant="white"
      >
        <b-card-text>으아ㅏ아ㅏㅏㅏ </b-card-text>
      </b-card>
    </div>

    <div>
      <b-row id="main-plan-container" align-h="center">
        <b-col md="auto" align-v="center" align-h="start">
          <b-row md="auto">여행 계획을 세우고 사람들과 공유해요.</b-row>
          <b-row><b-button class="plan-button">계획 세우기</b-button></b-row>
        </b-col>

        <b-col md="auto">
          <top-three-cards class="top3-cards" />
        </b-col>
      </b-row>

      <b-row class="board-container" align-h="center">
        <div>임시 이미지</div>
        <b-img src="https://picsum.photos/300/200/?image=41" fluid-grow alt="main image"></b-img>
      </b-row>
    </div>
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
/* @import "@/assets/css/common.css"; */
/* @import "@/assets/css/home.css"; */

.outer-container {
  padding-left: 0;
  padding-right: 0;
  margin-top: 70px;
  padding-top: 0;
}

#main-img {
  font-weight: bold;
}

#main-plan-container {
  margin: 4%;
  margin-top: 4%;
  padding: 15px;
  font-weight: bold;
}

.top3-cards {
  margin: 5%;
}

.board-container {
  margin: 0;
  padding: 0;
  margin-top: 4%;
  margin-bottom: 4%;
}

.plan-button,
.plan-button:focus {
  background-color: rgba(69, 113, 180, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.plan-button:active,
.plan-button:hover {
  background: rgba(50, 92, 156, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
