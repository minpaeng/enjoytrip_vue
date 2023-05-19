<template>
  <div>
    <b-card-group deck>
      <b-card
        class="card-item-top3"
        title="Title"
        img-src="https://picsum.photos/300/300/?image=41"
        img-alt="Image"
        img-top
        img-width="200"
        img-height="300"
      >
        <b-card-text> This content is a little bit longer. </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>

      <b-card
        class="card-item-top3"
        title="Title"
        img-src="https://picsum.photos/300/300/?image=41"
        img-alt="Image"
        img-top
        img-width="200"
        img-height="300"
      >
        <b-card-text>
          This card has supporting text below as a natural lead-in to additional content.
        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>

      <b-card
        class="card-item-top3"
        title="Title"
        img-src="https://picsum.photos/300/300/?image=41"
        img-alt="Image"
        img-top
        img-width="200"
        img-height="300"
      >
        <b-card-text>
          This is a wider card with supporting text below as a natural lead-in to additional
          content.
        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "TopThreeCards",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.card-item-top3 {
  padding: 1%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
