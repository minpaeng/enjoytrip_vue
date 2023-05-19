<template>
  <div class="container-fluid mt-5">
    <div class="row text-center">
      <div class="col m-5">
        <h1
          style="
            font-weight: bold;
            text-decoration-line: underline;
            text-decoration-thickness: 6px;
            text-decoration-color: rgb(189, 201, 255);
          "
        >
          공지사항
        </h1>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="container-md">
        <div class="row justify-content-center">
          <div
            class="col-md-6 p-3 text-center align-self-center"
            style="
              background-color: rgb(229, 245, 255);
              border-radius: 10px;
              border: 1px solid rgb(195, 221, 255);
            "
          >
            글 작성
          </div>
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="mb-2 col-md-6" id="form-write">
            <div class="row mb-3">
              <label for="title" class="form-label">제목:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                placeholder="제목 입력..."
                v-model="post.title"
              />
            </div>
            <div class="row mb-3">
              <label for="context" class="form-label">내용:</label>
              <textarea
                class="form-control"
                id="content"
                name="content"
                rows="8"
                placeholder="내용 입력..."
                style="overflow-y: scroll; resize: none"
                v-model="post.content"
              ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="d-lg-block col-3"></div>
            <div class="col-lg-6">
              <div class="d-flex ps-0">
                <button
                  type="button"
                  id="btn-create-post"
                  class="col-md-3 col-lg-2 btn btn-primary btn-sm me-1"
                  @click="writeInfoPost"
                >
                  글 작성
                </button>
                <button
                  type="button"
                  class="col-md-3 btn col-lg-2 btn-outline-danger btn-sm post-cancel"
                  @click="$router.push('/information?pgno=1')"
                >
                  목록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBoardInstance from "@/api/index";

export default {
  name: "InformationWrite",
  components: {},
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },
  created() {},
  methods: {
    async writeInfoPost() {
      try {
        await infoBoardInstance.post("/information/write", this.post);
        alert("작성 완료");
        this.$router.push("/information");
      } catch (err) {
        console.log(`공지사항 게시글 작성 실패: ${err}`);
      }
    },
  },
};
</script>

<style scoped></style>
