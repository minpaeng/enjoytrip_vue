<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ post.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="fw-bold">{{ post.userId }}</span> <br />
              <span class="text-secondary fw-light">조회수: {{ post.hit }}</span>
            </p>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{ post.content }}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <button
            type="button"
            id="btn-list"
            class="btn btn-outline-primary mb-3"
            @click="navTo('information')"
          >
            글목록
          </button>
          <!-- <c:if test="${userInfo.userId eq post.userId}"> -->
          <button
            type="button"
            id="btn-mv-modify"
            class="btn btn-outline-success mb-3 ms-1"
            @click="navTo('modify')"
          >
            글수정
          </button>
          <button
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
            @click="deleteInfoPost"
          >
            글삭제
          </button>
          <!-- </c:if> -->
        </div>
      </div>
      <comment-comp :comments="comments" :id="id"></comment-comp>
    </div>
  </div>
</template>

<script>
import infoBoardInstance from "@/api/index";
import CommentComp from "@/components/comment/CommentComp.vue";

export default {
  name: "InformationDetail",
  components: {
    CommentComp,
  },
  data() {
    return {
      id: null,
      post: {},
      commentPageCount: null,
      comments: [],
    };
  },
  created() {
    this.id = this.$route.params.no;
    this.getInfoPost();
    this.getInfoComments();
  },
  methods: {
    async getInfoPost() {
      try {
        let response = await infoBoardInstance.get(
          `http://localhost/api/information/detail/${this.id}`
        );
        this.post = response.data;
      } catch (err) {
        console.log("공지사항 게시글 목록 조회 오류: " + err);
      }
    },

    async deleteInfoPost() {
      try {
        await infoBoardInstance.delete(`/information/delete/${this.id}`);
        alert("삭제 완료");
        this.$router.push("/information");
      } catch (err) {
        console.log(`공지사항 게시글 삭제 실패: ${err}`);
      }
    },

    async getInfoComments() {
      try {
        console.log(`/information/${this.id}/comment`);
        let response = await infoBoardInstance.get(`/information/${this.id}/comment`);
        this.commentPageCount = response.data.pageCount;
        this.comments = response.data.list;
      } catch (err) {
        console.log(`댓글 목록 조회 실패: ${err}`);
      }
    },

    navTo(location) {
      if (location === "information") this.$router.push(`/${location}?pgno=1`);
      else {
        this.$router.push({ path: `/information/${location}/${this.id}` });
      }
    },
  },
};
</script>
