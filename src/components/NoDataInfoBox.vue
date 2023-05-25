<template>
  <div>
    <h6>{{ msg }}</h6>
  </div>
</template>

<script>
export default {
  name: "NoDataInfoBox",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  props: {
    msg: String,
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
