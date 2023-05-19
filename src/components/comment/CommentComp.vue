<template>
  <div class="card mb-2">
    <div class="card-header bg-light"><i class="fa fa-comment fa"></i> 댓글</div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="row">
            <div class="col-10">
              <textarea
                class="mt-2 mb-2 form-control"
                id="content"
                v-model="content"
                rows="1"
              ></textarea>
            </div>
            <div class="col-2">
              <button
                type="button"
                class="mt-2 mb-2 btn btn-dark"
                id="btn-comment"
                @click="writeComment"
              >
                등록
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="card border-0 mt-1 mb-1">
        <ul class="list-group">
          <comment-item
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          ></comment-item>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "@/components/item/CommentItem.vue";
import infoBoardInstance from "@/api/index";

export default {
  name: "CommentComp",
  components: {
    CommentItem,
  },
  props: {
    comments: Array,
    id: String,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async writeComment() {
      try {
        let post = {
          infoBoardId: this.id,
          content: this.content,
        };
        await infoBoardInstance.post(`information/${this.id}/comment`, post);
        window.location.reload();
      } catch (err) {
        console.log(`댓글 등록 실패: ${err}`);
      }
    },
  },
};
</script>

<style scoped></style>
