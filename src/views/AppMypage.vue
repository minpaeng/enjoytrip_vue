<template>
  <b-container fluid class="outer-container">
    <div class="img-container">
      <img class="top-img" src="@/assets/img/main.png" alt="main img" width="100%" height="810" />

      <div id="mypage-container" align-v="center" align-h="start">
        <h1><strong>기본 정보</strong></h1>

        <div id="private-info-box">
          <div class="box">
            <img class="profile" src="@/assets/img/main_2.png" />
          </div>
          <div id="private-info">
            <div><span>이름</span><span> 권민정</span></div>
            <div><span>이메일</span><span> sample@ssafy.com</span></div>
            <div><span>이름</span><span> 권민정</span></div>
            <div><span>이름</span><span> 권민정</span></div>
            <b-button class="mypage-button">정보 수정</b-button>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "AppMypage",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.outer-container {
  padding-left: 0;
  padding-right: 0;
}

.top-img {
  opacity: 0.5;
}

.img-container {
  position: relative;
}

#mypage-container {
  margin: 0;
  margin-top: 100px;
  padding-top: 30px;
  margin-left: 20px;
  padding-left: 10px;
  position: absolute;
  top: 1%;
  left: 5%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.39);
}

#private-info-box {
  display: flex;
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
}
</style>
