<template>
  <b-row class="card-outer" cols="3">
    <review-card v-for="review in reviews" :key="review.reviewId" :review="reviews[0]" />
  </b-row>
</template>

<script>
import ReviewCard from "./ReviewCard.vue";
export default {
  name: "TopThreeCards",
  components: {
    ReviewCard,
  },
  data() {
    return {
      reviews: [
        {
          reviewId: 18,
          userId: "ssafy2",
          planId: null,
          title: "test",
          content: "test",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-22 23:30:45",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath: "http://localhost/images/review/20230522/200574267522000록시땅핸드크림_체리블라썸.JPG",
            },
            {
              fid: 2,
              filePath: "http://localhost/images/review/20230522/200574269842800록시땅핸드크림_체리블라썸.JPG",
            },
          ],
        },
        {
          reviewId: 17,
          userId: "ssafy",
          planId: null,
          title: "test",
          content: "test",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-22 23:30:36",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath: "http://localhost/images/review/20230522/200565129846100록시땅핸드크림_체리블라썸.JPG",
            },
            {
              fid: 2,
              filePath: "http://localhost/images/review/20230522/200565135359000록시땅핸드크림_체리블라썸.JPG",
            },
          ],
        },
        {
          reviewId: 16,
          userId: "ssafy",
          planId: null,
          title: "test",
          content: "test",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-22 23:30:21",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath: "http://localhost/images/review/20230522/200550786467200록시땅핸드크림_체리블라썸.JPG",
            },
            {
              fid: 2,
              filePath: "http://localhost/images/review/20230522/200550794300500록시땅핸드크림_체리블라썸.JPG",
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.card-item-top3 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-outer {
  padding: 0;
  margin: 0;
}
</style>
