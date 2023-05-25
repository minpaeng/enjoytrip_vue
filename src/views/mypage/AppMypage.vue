<template>
  <b-container fluid class="outer-container">
    <div class="img-container">
      <div id="mypage-container" align-v="center" align-h="start">
        <h1 style="font-family: 'Nanum Gothic Coding', sans-serif; margin-top: 50px">
          <strong>기본 정보</strong>
        </h1>

        <div id="private-info-box">
          <div class="box">
            <img class="profile" src="@/assets/img/main_2.png" />
          </div>
          <div id="private-info" style="font-family: 'Jua', sans-serif">
            <div>
              <span>아이디</span><span> {{ userInfo.userId }}</span>
            </div>
            <div>
              <span>이름</span><span> {{ userInfo.userName }}</span>
            </div>
            <div>
              <span>이메일</span><span> {{ userInfo.emailId }}@{{ userInfo.emailDomain }}</span>
            </div>
            <div>
              <span>가입일</span><span> {{ dateFormat }}</span>
            </div>
            <b-button class="mypage-button" style="font-family: 'Nanum Gothic Coding', sans-serif"
              >정보 수정</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

const memberStore = "memberStore";

export default {
  name: "AppMypage",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
    dateFormat() {
      return this.userInfo.joinDate.split(" ")[0];
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

.outer-container {
  padding: 0;
  margin: 0;
  margin-top: 70px;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  height: 500px;
  background: no-repeat center/100% url("@/assets/img/main.png");
}

#mypage-container {
  align-self: center;
  justify-self: center;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.39);
}

#private-info-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  padding: 10px;
}

.box {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
}
.profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mypage-button {
  padding: 3px;
  margin: 10px;
  background: rgba(117, 168, 211, 0.89);
  background-color: rgba(117, 168, 211, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mypage-button:focus {
  background-color: rgba(117, 168, 211, 0.89);
  cursor: pointer;
}

.mypage-button:active,
.mypage-button:hover {
  background-color: rgba(101, 136, 187, 0.89);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

#private-info {
  margin: 20px;
  margin-left: 50px;
}
</style>
