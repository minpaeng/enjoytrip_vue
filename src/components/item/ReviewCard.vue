<template>
  <b-col class="review-card">
    <a href="#">
      <b-card class="card-item-top3" :title="review.title" :img-src="review.files[0].filePath" img-alt="Image" img-top img-width="100%" img-height="300">
        <b-card-text>{{ review.content }}</b-card-text>
        <template #footer>
          <small class="text-muted"
            >작성자: {{ review.userId }} <br />
            방문일자: {{ review.visitDate }}</small
          >
        </template>
      </b-card>
    </a>
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
};
</script>

<style scoped>
.review-card {
  opacity: 100%;
}

.review-card:hover {
  padding: 10px;
  /* -webkit-filter: grayscale(100%);
  filter: grayscale(100%); */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
