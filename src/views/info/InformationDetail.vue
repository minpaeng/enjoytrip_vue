<template>
  <div class="row justify-content-center" style="margin-top: 100px">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2 justify-content-center align-items-center">
        <div class="col-md-8 d-flex justify-content-center">
          <h2 class="text-secondary mb-0" style="padding-right: 10px">{{ post.title }}</h2>
          <!-- Remove mb-4 class -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <hr class="my-3" />
          <!-- Reduce margin of the dividing line -->
          <div class="clearfix align-content-center">
            <div class="text-secondary" style="word-wrap: break-word">{{ post.content }}</div>
          </div>
        </div>
      </div>
      <div class="divider mb-3"></div>

      <div class="d-flex justify-content-end">
        <button type="button" id="btn-list" class="btn btn-outline-primary mb-3" @click="navTo('infoboard')">글목록</button>
        <button v-show="userInfo.userId == post.userId" type="button" id="btn-mv-modify" class="btn btn-outline-success mb-3 ms-1" @click="navTo('modify')">
          글수정
        </button>
        <button v-if="userInfo.userId == post.userId" type="button" id="btn-delete" class="btn btn-outline-danger mb-3 ms-1" @click="deleteInfoPost">
          글삭제
        </button>
      </div>
      <comment-comp :comments="comments" :id="String(id)"></comment-comp>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { apiInstance } from "@/api/index";
import CommentComp from "@/components/comment/CommentComp.vue";
const memberStore = "memberStore";
const api = apiInstance();

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
  created() {},
  mounted() {
    this.id = this.$route.params.no;
    this.getInfoPost();
    this.getInfoComments();
  },
  methods: {
    async getInfoPost() {
      try {
        let response = await api.get(`/information/detail/${this.id}`);
        this.post = response.data;
      } catch (err) {
        console.log("공지사항 게시글 목록 조회 오류: " + err);
      }
    },

    async deleteInfoPost() {
      try {
        api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
        api.delete(`/information/delete/${this.id}`);
        alert("삭제 완료");
        this.$router.push("/infoboard?pgno=1&key=&word=");
      } catch (err) {
        console.log(`공지사항 게시글 삭제 실패: ${err}`);
      }
    },

    async getInfoComments() {
      try {
        console.log(`/information/${this.id}/comment`);
        let response = await api.get(`/information/${this.id}/comment`);
        this.commentPageCount = response.data.pageCount;
        this.comments = response.data.list;
      } catch (err) {
        console.log(`댓글 목록 조회 실패: ${err}`);
      }
    },

    navTo(location) {
      if (location === "infoboard") this.$router.push(`/${location}?pgno=1`);
      else {
        this.$router.push({ path: `/infoboard/${location}/${this.id}` });
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>
