<template>
  <div class="container-fluid mt-5">
    <div class="row text-center">
      <div class="col m-5">
        <h1 style="font-weight: bold; text-decoration-line: underline; text-decoration-thickness: 6px; text-decoration-color: rgb(189, 201, 255)">
          좋은 정보 공유해요!!!
        </h1>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="container-md">
        <div class="row justify-content-center">
          <div
            class="col-md-6 p-3 text-center align-self-center"
            style="background-color: rgb(229, 245, 255); border-radius: 10px; border: 1px solid rgb(195, 221, 255)"
          >
            글 수정
          </div>
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="mb-2 col-md-6">
            <input type="hidden" name="id" value="${post.id}" />
            <div class="row mb-3">
              <label for="title" class="form-label">제목:</label>
              <input type="text" class="form-control" id="title" name="title" placeholder="제목 입력..." v-model="post.title" />
            </div>
            <div class="row mb-3">
              <label for="context" class="form-label">내용:</label>
              <textarea class="form-control" id="content" name="content" rows="8" style="overflow-y: scroll; resize: none" v-model="post.content"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-lg-block col-3"></div>
          <div class="col-lg-6">
            <div class="d-flex ps-0 justify-content-center">
              <button type="button" id="btn-modify-post" class="col-md-3 col-lg-2 btn btn-primary btn-sm me-1" @click="modifyInfoPost">글 수정</button>
              <!-- <button type="button" class="col-md-3 btn col-lg-2 btn-outline-danger btn-sm post-cancel">목록</button> -->
              <router-link to="/infoboard?pgno=1" class="col-md-3 btn col-lg-2 btn-outline-danger btn-sm"> 목록 </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index";
const api = apiInstance();

export default {
  name: "InformationModify",
  components: {},
  data() {
    return {
      id: null,
      post: {},
    };
  },
  created() {
    this.id = this.$route.params.no;
    this.getInfoPost();
  },
  methods: {
    async getInfoPost() {
      try {
        console.log(this.id);
        let response = await api.get(`/information/detail/${this.id}`);
        console.log(response.data);
        this.post = response.data;
      } catch (err) {
        console.log(`공지사항 게시글 조회 실패: ${err}`);
      }
    },
    async modifyInfoPost() {
      try {
        api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
        api.put(`/information/modify/${this.id}`, this.post);
        alert("수정 완료");
        this.$router.push("/infoboard?pgno=1&key=&word=");
      } catch (err) {
        alert(`공지사항 게시글 수정 실패: ${err}`);
      }
    },
  },
};
</script>

<style scoped></style>
