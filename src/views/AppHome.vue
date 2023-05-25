<template>
  <b-container fluid class="outer-container">
    <div id="main-img">
      <b-card
        overlay
        :img-src="require('@/assets/img/main.png')"
        img-height="650px"
        img-alt="Card Image"
        text-variant="white"
        title="Enjoy Trip"
        sub-title="x"
        sub-title-text-variant="white"
        title-tag="h1"
        sub-title-tag="h6"
      >
        <b-card-text text-tag="h5">여행 계획, 일정 공유</b-card-text>
      </b-card>
    </div>

    <div>
      <b-row id="main-plan-container" align-h="center">
        <b-col cols="12" align-v="center" align-h="start">
          <b-row class="tt">
            <b-col md="auto">여행 계획을 세우고 관리해요.</b-col>
            <router-link to="/plancreate">
              <b-button class="plan-button">계획 세우기</b-button>
            </router-link>
            <b-col md="auto" style="text-align: center; overflow: hidden">
              <img src="@/assets/img/main_plan.png" class="img-plan" />
            </b-col>
          </b-row>
          <b-row>
            <b-col md="auto">여행 후기를 공유하고 추천해요.</b-col>
            <router-link to="/reviewcreate">
              <b-button class="plan-button">후기 작성</b-button>
            </router-link>
            <b-col md="auto">
              <top-three-cards class="top3-cards" :top3List="top3List" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import TopThreeCards from "@/components/item/TopThreeCards.vue";
import { getTop3ReviewList } from "@/api/review";

export default {
  name: "HomeView",
  components: {
    TopThreeCards,
  },
  data() {
    return {
      top3List: [],
    };
  },
  created() {
    getTop3ReviewList(
      ({ data }) => {
        this.top3List = data;
      },
      (err) => {
        console.log(err);
      }
    );
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

.img-box-plan {
  display: flex;
  flex-direction: start;
}

.tt {
  background-color: rgba(0, 61, 194, 0.123);
  padding-top: 50px;
  margin-top: 0;
  margin-bottom: 80px;
  padding-left: 30px;
}

.img-plan {
  margin: 50px;
  border: 1px solid rgba(156, 156, 156, 0.281);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  object-fit: cover;
  width: 90%;
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
