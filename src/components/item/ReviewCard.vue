<template>
  <b-col class="review-card">
    <router-link :to="{ name: 'shareboarddetail', params: { no: review.reviewId } }">
      <b-card class="card-item" :title="review.title" :img-src="review.files[0].filePath" img-alt="Image" img-top img-width="100%" img-height="300">
        <b-card-text>{{ review.content }}</b-card-text>
        <template #footer>
          <small class="text-muted"
            >작성자: {{ review.userId }} <br />
            방문일자: {{ cardDate }}<br />
            <font-awesome-icon :icon="['fas', 'heart']" style="color: #ff0000" /> + {{ review.count }}
          </small>
        </template>
      </b-card>
    </router-link>
  </b-col>
</template>

<script>
export default {
  name: "ReviewCard",
  components: {},
  props: {
    review: Object,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    cardDate() {
      return this.review.visitDate.split(" ")[0];
    },
  },
};
</script>

<style scoped>
.review-card {
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 100%;
}

.review-card:hover {
  /* -webkit-filter: grayscale(100%);
  filter: grayscale(100%); */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
