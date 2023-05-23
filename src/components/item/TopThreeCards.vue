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
          reviewId: 20,
          userId: "ssafy",
          planId: null,
          title: "리뷰 테스트",
          content: "내용",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-23 13:41:45",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath: "http://localhost/images/review/20230523/4912098259695900mollang.jpg",
            },
            {
              fid: 2,
              filePath: "http://localhost/images/review/20230523/4912098261264100mollang.jpg",
            },
          ],
        },
        {
          reviewId: 19,
          userId: "ssafy",
          planId: null,
          title: "리뷰 테스트",
          content: "내용",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-23 13:41:44",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath: "http://localhost/images/review/20230523/4912097404058200mollang.jpg",
            },
            {
              fid: 2,
              filePath: "http://localhost/images/review/20230523/4912097405854500mollang.jpg",
            },
          ],
        },
        {
          reviewId: 18,
          userId: "ssafy",
          planId: null,
          title: "리뷰 테스트",
          content: "내용",
          visitDate: "2023-05-22 00:00:00",
          registerTime: "2023-05-23 09:11:49",
          hit: 0,
          files: [
            {
              fid: 1,
              filePath:
                "http://localhost/images/review\\20230523\\48959019413293007799ab7b-96c0-47e3-9cfd-2f0dc03329c5.jpg",
            },
            {
              fid: 2,
              filePath:
                "http://localhost/images/review\\20230523\\48959019435159007799ab7b-96c0-47e3-9cfd-2f0dc03329c5.jpg",
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
