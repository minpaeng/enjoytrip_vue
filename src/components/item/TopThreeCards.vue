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
            "reviewId": 10,
            "userId": "ssafy",
            "planId": null,
            "title": "리뷰 테스트",
            "content": "내용",
            "visitDate": "2023-05-22 00:00:00",
            "registerTime": "2023-05-23 10:08:50",
            "hit": 0,
            "files": [
                {
                    "fid": 1,
                    "filePath": "http://localhost/images/review/20230523/90537103765500Image Pasted at 2023-5-18 14-48.png"
                },
                {
                    "fid": 2,
                    "filePath": "http://localhost/images/review/20230523/9053710585100020230508＿123531.jpg"
                }
            ]
        },
        {
            "reviewId": 9,
            "userId": "ssafy",
            "planId": null,
            "title": "리뷰 테스트",
            "content": "내용",
            "visitDate": "2023-05-22 00:00:00",
            "registerTime": "2023-05-23 10:08:49",
            "hit": 0,
            "files": [
                {
                    "fid": 1,
                    "filePath": "http://localhost/images/review/20230523/90536414076600Image Pasted at 2023-5-18 14-48.png"
                },
                {
                    "fid": 2,
                    "filePath": "http://localhost/images/review/20230523/9053641592990020230508＿123531.jpg"
                }
            ]
        },
        {
            "reviewId": 8,
            "userId": "ssafy",
            "planId": null,
            "title": "리뷰 테스트",
            "content": "내용",
            "visitDate": "2023-05-22 00:00:00",
            "registerTime": "2023-05-23 10:07:23",
            "hit": 0,
            "files": [
                {
                    "fid": 1,
                    "filePath": "http://localhost/images/review/20230523/90463632686400Image Pasted at 2023-5-18 14-48.png"
                },
                {
                    "fid": 2,
                    "filePath": "http://localhost/images/review/20230523/9046363612120020230508＿123531.jpg"
                }
            ]
        }
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
