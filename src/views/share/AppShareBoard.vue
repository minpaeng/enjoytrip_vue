<template>
  <b-container fluid class="outer-container">
    <div class="img-container">
      <img class="top-img" src="@/assets/img/main.png" alt="main img" width="100%" height="810" />

      <b-row class="share-container" align-v="center" align-h="start">
        <b-col md="auto"><strong>여행 계획을 세우고 사람들과 공유해요.</strong></b-col>
        <b-col md="auto"><b-button class="share-button">계획 세우기</b-button></b-col>
        <b-col md="auto">
          <b-row class="card-container" align-h="center">
            <h5><strong>top3</strong></h5>
            <top-three-cards id="card-list" />
          </b-row>
        </b-col>
      </b-row>

      <b-container fluid>
        <b-row id="cards" cols="5" align-h="start" align-v="start">
          <review-card v-for="review in reviewList" :key="review.reviewId" :review="review" />
        </b-row>
        <b-row align-h="center">
          <template>
            <div class="overflow-auto">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageCount" use-router></b-pagination-nav>
            </div>
          </template>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import TopThreeCards from "@/components/item/TopThreeCards.vue";
import ReviewCard from "@/components/item/ReviewCard.vue";
import { getReviewList } from "@/api/review";

export default {
  name: "AppShareBoard",
  components: {
    TopThreeCards,
    ReviewCard,
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      reviewList: [],
    };
  },
  created() {
    this.reviewList = getReviewList(
      ({ data }) => {
        // console.log(data);
        this.reviewList = data.reviews;
        console.log(this.reviewList);
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: "/shareboard",
        query: {
          pgno: pageNum,
        },
      };
    },
  },
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
  margin: 10px;
  padding: 20px;
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
