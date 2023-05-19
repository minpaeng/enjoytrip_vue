<template>
  <b-container class="login-container">
    <section class="login-form">
      <h1><strong>Login</strong></h1>
      <form action="">
        <div class="int-area">
          <input type="text" v-model="user.id" autocomplete="off" required />
          <label><font-awesome-icon :icon="['fas', 'user']" style="color: #4385b4" /> 이름</label>
        </div>
        <div class="int-area">
          <input type="password" v-model="user.password" autocomplete="off" required />
          <label><font-awesome-icon :icon="['fas', 'key']" style="color: #4385b4" /> 비밀번호</label>
        </div>
        <div class="btn-area">
          <b-button id="login-btn" @click="doLogin">로그인</b-button>
        </div>
      </form>
      <div class="join-link">
        <!-- <a href="">비밀번호 찾기</a> -->
        <router-link to="/join">회원가입</router-link>
      </div>
    </section>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "AppLogin",
  components: {},
  data() {
    return {
      user: {
        id: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async doLogin() {
      await this.userConfirm(this.user);

      let token = sessionStorage.getItem("access-token");
      if (this.getUserInfo) {
        await this.getUserInfo(token);
        this.$router.push({ name: "home" });
      } else {
        alert("로그인 실패");
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["isLogin"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

.login-container {
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form h1 {
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

#login-btn {
  width: 100%;
  height: 50px;
  margin: 0px 10px;
  color: #fff;
  background: #166caa;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: Jua;
}

.join-link {
  margin-top: 20px;
  text-align: center;
}

.join-link a,
.join-link a:active {
  font-family: "Nanum Gothic Coding", sans-serif;
  margin: 0 20px;
  font-size: 15px;
  color: rgb(81, 135, 197);
  text-decoration: none;
}

.join-link a:hover,
.join-link a:focus {
  margin: 0 20px;
  font-size: 15px;
  color: rgb(36, 62, 92);
  text-decoration: none;
}
</style>
