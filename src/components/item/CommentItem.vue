<template>
  <li class="list-group-item border-0 border-bottom">
    <div class="row mt-1">
      <div class="col-1">{{ comment.userId }}</div>
      <div class="col-8">{{ comment.content }}</div>
      <div class="col-2">{{ comment.registerDate }}</div>
      <button class="col-1 btn btn-outline-dark btn-sm" @click="deleteComment">삭제</button>
    </div>
  </li>
</template>

<script>
import {apiInstance} from "@/api/index";

export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: Object,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    async deleteComment() {
      try {
        console.log("삭제 요청");
        console.log(this.comment.id);
        await apiInstance().delete(`/information/comment/${this.comment.id}`);
        window.location.reload();
      } catch (err) {
        console.log(`댓글 삭제 오류: ${err}`);
      }
    },
  },
};
</script>

<style scoped></style>
