<template>
  <div>
    <div class="row justify-content-center" id="container" style="margin-top: 100px">
      <h1 style="font-weight: bold; text-decoration-line: underline; text-decoration-thickness: 6px; text-decoration-color: rgb(189, 201, 255)">
        후기 상세보기
      </h1>
    </div>
    <div class="row" id="container">
      <div class="col md-6">
        <b-row class="text-center">
          <div class="col m-6">
            <h1 style="font-weight: bold">제목: {{ shareBoardDto.title }}</h1>
            <p class="text-wrapper" style="text-align: right; margin-right: 25%; color: black">방문일자: {{ shareBoardDto.visitDate }}</p>
            <p class="text-wrapper" style="text-align: right; margin-right: 25%; color: black">조회수: {{ shareBoardDto.hit }}</p>

            <!-- <carousel-3d :autoplay="true" :autoplay-timeout="3000" :controls-visible="true" :controls-prev-html="'&#x2039; '" :controls-next-html="'&#x203A;'" :controls-width="10" :controls-height="30" :clickable="false">
                          <slide v-for="(filePath, index) in files" :key="parseInt(index)" :index="parseInt(index)">
                          <img :src="filePath" class="slideImage">
                          </slide>
                        </carousel-3d> -->

            <!-- <carousel>
                          <slide v-for="(filePath, index) in files" :key="parseInt(index)" :index="parseInt(index)">
                          <img :src="filePath" class="slideImage">
                          </slide>
                        </carousel> -->
            <div class="d-flex justify-content-center align-items-center" style="overflow-y: auto">
              <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                class="custom-carousel"
                style="text-shadow: 1px 1px 2px #333"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide
                  v-for="(filePath, index) in files"
                  :key="parseInt(index)"
                  :index="parseInt(index)"
                  :img-src="filePath"
                  style="width: 400px; height: 400px"
                ></b-carousel-slide>
              </b-carousel>
            </div>

            <p class="text-wrapper" style="color: black; font-size: 20px">이미지를 넘기세요</p>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            <div>
              <span @click="toggleLike" :class="{ 'heart-icon': true, liked: liked }">
                <font-awesome-icon :icon="[liked ? 'fas' : 'far', 'heart']" />
              </span>
              <span> 좋아요 {{ likeCount }}</span>
            </div>

            <label for="content" class="text-wrapper" style="color: black; font-size: 20px; display: block">내용:</label>

            <input
              class="fixed-size-input"
              type="text"
              id="content"
              name="content"
              value=""
              disabled
              style="
                font-family: 'Lobster', sans-serif;
                font-weight: bold;
                font-size: 20px;
                color: #333;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 10px;
                overflow: scroll;
                width: 500px;
                height: 150px;
              "
            /><br />
          </div>
        </b-row>
      </div>
      <div class="col md-6">
        <label for="location" class="text-wrapper" style="color: black; font-size: 20px; display: block">장소명:</label>
        <input
          class="fixed-size-input"
          type="text"
          id="location"
          name="location"
          value=""
          disabled
          style="
            font-size: 20px;
            font-family: Jua;
            font-weight: bold;
            font-size: 20px;
            color: #333;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: scroll;
            width: 100%;
            height: 10%;
            text-align: center;
          "
        /><br />
        <div id="map" class="map-container" style="height: 70%; margin-bottom: 10%; margin-top: 5%"></div>
      </div>
    </div>
    <b-button class="share-button" @click="$router.push({ name: 'shareboard', query: { pgno: 1 } })">목록가기</b-button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

.share-button,
.share-button:focus {
  background-color: rgba(69, 113, 180, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  margin-bottom: 50px;
}

.share-button:active,
.share-button:hover {
  background: rgba(50, 92, 156, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.thumb-filled {
  color: black;
}

.custom-carousel {
  width: 400px; /* Adjust the width as needed */
  height: 400px; /* Adjust the height as needed */
}

.map-container {
  position: relative;
  height: 100%;
  margin-bottom: 70px;
  padding-bottom: 0;
}

#container {
  padding: 2em;
  flex: 1 1 auto;
  /*grow vertically*/
  text-align: center;
}

.fixed-size-input {
  width: 60%;
  max-height: 100%;
  overflow: auto; /* Add a scroll bar in case content overflows */
}

#slides {
  width: 100%; /* Set the container width to 100% */
  height: 100%; /* Set the container height to 100% */
}

.text-wrapper {
  color: white;
  font-family: "Nanum Gothic Coding", sans-serif, bold;
}

.prev[data-v-05517ad0] {
  left: 244px !important;
  top: 0px !important;
}
.next[data-v-05517ad0] {
  right: 225px !important;
  top: 0px !important;
}
.heart-icon {
  cursor: pointer;
}

.heart-icon .svg-inline--fa {
  width: 1em;
  height: 1em;
}

.heart-icon.liked .svg-inline--fa {
  color: red;
}
</style>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2b9c9a29b813d54c215be430ea52d9db&libraries=services,clusterer,drawing"></script>

<script>
import { Carousel, Slide } from "vue-carousel";
// import {Carousel3d, Slide} from 'vue-carousel-3d';
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { makeLike, deleteLike, getReview, checkLike } from "@/api/review";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";

// Import the individual icons you want to use
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faHeart);

// Vue.use(Carousel3d);
Vue.use(Carousel);

Vue.component;

export default {
  name: "ShareDetail",
  components: {
    // Carousel3d,
    Carousel,
    Slide,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      id: null,
      shareBoardDto: {},
      fileObjects: [],
      files: [],
      isThumbFilled: false,
      likeCount: 0,
      liked: false,
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.params.no;
    checkLike(
      { userId: this.userInfo.userId, reviewId: this.id },
      ({ data }) => {
        if (data.message == "true") {
          this.liked = true;
          console.log("liked", this.liked);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.getShareBoardDetail();

    this.$nextTick(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    });

    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    toggleLike() {
      if (!this.liked) {
        makeLike(
          { userId: this.userInfo.userId, reviewId: this.id },
          () => {
            console.log("좋아요 표시 성공");
            this.likeCount++;
          },
          () => {
            console.log("좋아요 표시 실패");
          }
        );
      } else {
        deleteLike(
          { userId: this.userInfo.userId, reviewId: this.id },
          () => {
            console.log("좋아요 취소 성공");
            this.likeCount--;
          },
          () => {
            console.log("좋아요 취소 실패");
          }
        );
      }
      this.liked = !this.liked;
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    async getShareBoardDetail() {
      console.log(this.id);
      try {
        await getReview(
          this.id,
          ({ data }) => {
            console.log("로딩 성공");
            this.shareBoardDto = data;
            this.fileObjects = data.files;
            this.likeCount = this.shareBoardDto.count;

            for (let i = 0; i < this.fileObjects.length; i++) {
              this.files.push(this.fileObjects[i].filePath);
            }

            document.getElementById("content").value = this.shareBoardDto.content;
            document.getElementById("location").value = this.shareBoardDto.spotName + " " + this.shareBoardDto.spotAddress;

            this.moveCenter(this.shareBoardDto.x, this.shareBoardDto.y);
          },
          function () {
            console.log("로딩 실패");
          }
        );
      } catch (err) {
        console.log("후기 게시글 목록 조회 오류: " + err);
      }
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      console.log(this.map);
    },
    moveCenter(lat, lng) {
      try {
        this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      } catch (err) {
        console.log("에러");
        console.log(this.map);
        console.log(err);
      }
    },
    myFunction(x) {
      if (this.thumbActivation === true) {
        console.log("A");
        x.classList.toggle("fa-thumbs-down");
        this.thumbActivation = false;
      } else {
        console.log("B");
        x.classList.toggle("fa-thumbs-down");
        this.thumbActivation = true;
      }
    },
    displayMarker() {
      // 기존의 마커를 삭제합니다
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

      // 마커 이미지의 이미지 주소입니다
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 관광지

      for (var i = 0; i < this.positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.positions[i].latlng, // 마커를 표시할 위치
          title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
          clickable: true, // 마커 클릭을 가능하게 함
        });

        this.markers[i] = marker;

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 해당 관광지의 이름 출력
          alert(this.Gb);
        });
      }
      // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
      this.map.setCenter(this.positions[0].latlng);
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
    dateFormat() {
      return this.userInfo.joinDate.split(" ")[0];
    },
  },
};
</script>
