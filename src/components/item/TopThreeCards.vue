<template>
  <b-row class="card-outer" cols="3">
    <review-card v-for="review in top3List" :key="review.reviewId" :review="review" />
  </b-row>
</template>

<script>
import ReviewCard from "./ReviewCard.vue";
export default {
  name: "TopThreeCards",
  components: {
    ReviewCard,
  },
  props: {
    top3List: Array,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this.top3List[0]);
  },
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
