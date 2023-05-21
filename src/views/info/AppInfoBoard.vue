<template>
  <!-- 중앙 content start -->
  <b-container>
    <!-- <b-row> -->
    <b-row class="text-center">
      <div class="col m-5">
        <h1
          style="
            font-weight: bold;
            text-decoration-line: underline;
            text-decoration-thickness: 6px;
            text-decoration-color: rgb(189, 201, 255);
            margin-top: 100px;
          "
        >
          공지사항
        </h1>
      </div>
    </b-row>
    <!-- <b-row class="justify-content-between ps-2 pe-2 ms-2 ms-2"> -->
    <div class="d-flex justify-content-between">
      <b-col md="auto" class="d-flex align-items-center mb-3">
        <a type="button" id="write-button" class="btn btn-outline-primary" style="font-weight: bold" href="" @click="$router.push('/infoboard/write')">
          글쓰기
        </a>
      </b-col>

      <div class="col-auto">
        <form id="form-search">
          <input type="hidden" name="pgno" value="1" />
          <div class="row pe-2 me-2">
            <select v-model="key" class="col form-select me-1" name="key" id="key" aria-label=".form-select example">
              <option selected value="">검색조건</option>
              <option value="info_board_id">글번호</option>
              <option value="title">제목</option>
              <option value="user_id">작성자</option>
            </select>
            <input type="text" name="word" id="word" placeholder="검색어입력..." class="col form-control me-1" v-model="word" />
            <button type="button" id="btn-search" class="col btn btn-outline-secondary me-2" @click="getInfoPosts(1, key, word)">검색</button>
          </div>
        </form>
      </div>
    </div>
    <div>
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
                <router-link :to="{ name: 'infoDetail', params: { no: post.id } }">{{ post.title }}</router-link>
              </td>
              <td>{{ post.userId }}</td>
              <td>{{ post.registerDate }}</td>
              <td>{{ post.hit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-row align-h="center">
        <template>
          <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageCount" use-router></b-pagination-nav>
          </div>
        </template>
      </b-row>
    </div>

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
    this.pgno = this.$route.query.pgno;
    this.key = this.$route.query.key;
    this.word = this.$route.query.word;
  },
  mounted() {
    this.getInfoPosts(this.pgno, this.key, this.word);
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: "/infoboard",
        query: {
          pgno: pageNum,
          key: this.key,
          word: this.word,
        },
      };
    },
    async getInfoPosts(pgno, key, word) {
      try {
        if (typeof pgno == "undefined") pgno = 1;

        let uri = `http://localhost/api/information/list?pgno=${pgno}&key=${key}&word=${word}`;
        //async 사용 이유
        let response = await axios.get(uri);

        this.pageCount = response.data.pageCount;
        this.list = response.data.list;
      } catch (err) {
        console.log("공지사항 게시글 목록 조회 오류: " + err);
      }
    },
  },
};
</script>

<style scoped>
.active {
  color: blue;
}
</style>
