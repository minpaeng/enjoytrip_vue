<template>
  <b-container class="join-container">
    <section class="join-form">
      <h1><strong>Join</strong></h1>
      <b-form class="sign-form" method="POST" action="member/join">
        <div class="row m-1 mb-3">
          <div class="d-flex justify-content-start ps-0">
            <i class="bi bi-patch-question me-1"></i>
            <label for="user-id" class="form-label">아이디</label>
          </div>
          <input type="text" class="form-control" id="user-id" name="user-id" v-model="user.userId" placeholder="아이디" />
        </div>
        <div class="row m-1 mb-3">
          <div class="d-flex justify-content-start ps-0">
            <i class="bi bi-patch-question me-1"></i>
            <label for="name" class="form-label">이름</label>
          </div>
          <input type="text" class="form-control" id="name" name="name" v-model="user.userName" placeholder="이름" />
        </div>
        <div class="row m-1 mb-3">
          <div class="d-flex justify-content-start ps-0">
            <i class="bi bi-patch-question me-1"></i>
            <label for="password" class="form-label">비밀번호</label>
          </div>
          <input type="password" class="form-control" id="password" v-model="user.userPassword" placeholder="비밀번호" name="password" />
        </div>
        <div class="row m-1 mb-3">
          <div class="d-flex justify-content-start ps-0">
            <i class="bi bi-patch-question me-1"></i>
            <label for="password-check" class="form-label">비밀번호확인</label>
          </div>
          <input type="password" class="form-control" id="password-check" placeholder="비밀번호확인" name="password-check" />
        </div>
        <div class="row m-1 mb-3">
          <div class="d-flex justify-content-start ps-0">
            <i class="bi bi-patch-question me-1"></i>
            <label for="email" class="form-label">이메일</label>
          </div>
          <div class="d-flex justify-content-start ps-0">
            <input type="email" class="form-control" id="email" placeholder="이메일" name="email" v-model="user.emailId" />
            <span class="ms-2 me-2">@</span>
            <select id="domain" class="form-select" name="domain" aria-label=".form-select domain" v-model="user.emailDomain">
              <option selected>도메인 선택</option>
              <option value="ssafy.com">ssafy.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
            </select>
          </div>
        </div>
        <div class="btn-area">
          <b-button id="join-btn" @click="doJoin">회원가입</b-button>
        </div>
      </b-form>
    </section>
  </b-container>
</template>

<script>
import { join } from "@/api/member";

export default {
  name: "AppJoin",
  data() {
    return {
      user: {
        userId: null,
        userName: null,
        userPassword: null,
        emailId: null,
        emailDomain: null,
      },
    };
  },
  methods: {
    async doJoin() {
      await join(
        this.user,
        () => {
          alert("회원가입 완료");
          this.$router.push({ name: "home" });
        },
        () => alert("회원가입 실패")
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

.join-container {
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.join-form h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 50px;
}

.int-area {
  width: 400px;
  position: relative;
  margin-top: 20px;
}

.int-area:first-child {
  margin-top: 0;
}

.int-area input {
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  outline: none;
}

.int-area label {
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 18px;
  transition: top 0.5s ease;
}

.int-area input:focus + label,
.int-area input:valid + label {
  top: -2px;
  font-size: 13px;
  color: #166caa;
}

.btn-area {
  margin-top: 30px;
}

#join-btn {
  font-family: Jua;
  width: 100%;
  height: 50px;
  margin: 0px 10px;
  color: #fff;
  background: #166caa;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>
