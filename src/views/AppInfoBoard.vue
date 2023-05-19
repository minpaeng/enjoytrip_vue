<template>
  <!-- 중앙 content start -->
  <b-container fluid>
    <b-row>
      <b-row class="text-center">
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
      </b-row>
      <b-row class="justify-content-between ps-2 pe-2 ms-2 ms-2">
        <b-col md="auto">
          <a
            type="button"
            id="write-button"
            class="btn btn-outline-primary"
            style="font-weight: bold"
            href=""
            @click="$router.push('/infoboard/write')"
          >
            글쓰기
          </a>
        </b-col>
        <div class="col-auto">
          <form id="form-search">
            <input type="hidden" name="pgno" value="1" />
            <div class="row pe-2 me-2">
              <select
                v-model="key"
                class="col form-select me-1"
                name="key"
                id="key"
                aria-label=".form-select example"
              >
                <option selected value="">검색조건</option>
                <option value="info_board_id">글번호</option>
                <option value="title">제목</option>
                <option value="user_id">작성자</option>
              </select>
              <input
                type="text"
                name="word"
                id="word"
                placeholder="검색어입력..."
                class="col form-control me-1"
                v-model="word"
              />
              <button
                type="button"
                id="btn-search"
                class="col btn btn-outline-secondary me-2"
                @click="getInfoPosts(1, key, word)"
              >
                검색
              </button>
            </div>
          </form>
        </div>

        <div class="row mt-3">
          <div class="d-flex justify-content-center">
            <table class="table table-striped table-bordered text-center mb-5">
              <thead>
                <tr>
                  <th scope="col">글번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일</th>
                  <th scope="col">조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in list" :key="post.id" v-bind="list">
                  <td>{{ post.id }}</td>
                  <td>
                    <router-link :to="{ name: 'informationDetail', params: { no: post.id } }">{{
                      post.title
                    }}</router-link>
                  </td>
                  <td>{{ post.userId }}</td>
                  <td>{{ post.registerDate }}</td>
                  <td>{{ post.hit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 컴포넌트로 분리해서 다른 게시판에서도 재사용하도록 수정해야함 -->
          <div class="post-nav">
            <ul class="pagination justify-content-center">
              <li class="page-item" data-pg="1">
                <a href="#" class="page-link" @click="changePage(1)">최신</a>
              </li>
              <li class="page-item" data-pg="currentPage">
                <a href="#" class="page-link" @click="canGoPrePage">이전</a>
              </li>
              <li v-for="index in pageCount" :key="index" class="page-item" :data-pg="index">
                <a href="#" class="page-link" @click="changePage(`${index}`)">{{ index }}</a>
              </li>
              <li class="page-item" data-pg="currentPage">
                <a href="#" class="page-link" @click="canGoNextPage">다음</a>
              </li>
              <li class="page-item" data-pg="pageCount">
                <a href="#" class="page-link" @click="changePage(pageCount)">마지막</a>
              </li>
            </ul>
          </div>
        </div>
      </b-row>
    </b-row>

    <div class="row"></div>
  </b-container>
  <!-- 중앙 content end -->
</template>

<script>
import axios from "axios";

export default {
  name: "InformationView",
  components: {},
  data() {
    return {
      key: "",
      word: "",
      pageCount: null,
      list: [],
      pgno: 1,
    };
  },
  created() {
    this.getInfoPosts(this.pgno, "", "");
  },
  methods: {
    async getInfoPosts(pgno, key, word) {
      try {
        if (typeof pgno == "undefined") pgno = 1;

        let uri = `http://localhost/api/information/list?pgno=${pgno}&key=${key}&word=${word}`;
        let response = await axios.get(uri);

        this.pageCount = response.data.pageCount;
        this.list = response.data.list;

        if (word != "") this.word = "";
      } catch (err) {
        console.log("공지사항 게시글 목록 조회 오류: " + err);
      }
    },
    canGoNextPage() {
      if (this.pgno >= 1 && this.pgno < this.pageCount) {
        this.pgno++;
        this.list = this.getInfoPosts(this.pgno, this.key, this.word);
      }
    },
    canGoPrePage() {
      if (this.pgno > 1 && this.pgno <= this.pageCount) {
        this.pgno--;
        this.list = this.getInfoPosts(this.pgno, this.key, this.word);
      }
    },
    changePage(index) {
      this.pgno = index;
      this.list = this.getInfoPosts(this.pgno, this.key, this.word);
    },
  },
};
</script>

<style scoped></style>
