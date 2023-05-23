<template>
  <b-container fluid class="outer-container">
    <b-row align-h="center" align-v="center" style="margin: 0; padding: 30px">
      <h4><strong>후기 작성</strong></h4>
    </b-row>
    <b-row class="bound box">
      <b-col cols="6" class="bound">
        <b-row class="bound">
          <b-col cols="2" class="margin-area"><label>제목</label></b-col>
          <b-col cols="10" class="margin-area">
            <b-form-input v-model="review.title" placeholder="제목"></b-form-input>
          </b-col>
          <b-col cols="2" class="margin-area"><label>내용</label></b-col>
          <b-col cols="10" class="margin-area">
            <b-form-textarea id="textarea" v-model="text" placeholder="내용" rows="3" max-rows="6"></b-form-textarea>
          </b-col>
          <b-col cols="2" class="margin-area">
            <label>방문날짜</label>
          </b-col>
          <b-col cols="10" class="margin-area">
            <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2" placeholder="날짜 선택"></b-form-datepicker>
          </b-col>
          <b-col cols="2" class="margin-area">
            <label>사진첨부</label>
          </b-col>
          <b-col cols="10" class="margin-area">
            <b-form-file multiple="true" v-model="files" :state="Boolean(files)" placeholder="파일을 선택" drop-placeholder="Drop file here..."></b-form-file>
            <b-col cols="12" v-for="(file, index) in files" :key="index"> 첨부 파일: {{ file ? file.name : "" }} </b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6" class="bound">
        <div id="menu_wrap" class="bg_white">
          <div class="option">
            장소명 : <input type="text" v-model="keyword" size="15" />
            <b-button @click="searchPlaces">검색하기</b-button>
          </div>
        </div>
        <div id="map" style="width: 100%; height: 500px"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ShareCreate",
  components: {},
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
      ps: null,
      keyword: "",
      files: [],
      text: "",
      date: "",
      review: {
        userId: "ssafy",
        title: "리뷰 테스트",
        content: "내용",
        visitDate: "2023-05-22",
      },
    };
  },
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}&&libraries=services,clusterer,drawing`;
      document.head.appendChild(script);
    }
  },
  methods: {
    // 맵 초기화
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.ps = new kakao.maps.services.Places();
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    },

    searchPlaces() {
      if (!this.keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      this.ps.keywordSearch(this.keyword, this.placesSearchCB);
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        this.displayPlaces(data);
        console.log(data);
        // 페이지 번호를 표출합니다
        // this.displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    },

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    displayPlaces(places) {
      var menuEl = document.getElementById("menu_wrap"),
        bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = this.addMarker(placePosition, i);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        (function (marker, title) {
          kakao.maps.event.addListener(marker, "click", function () {
            console.log(title);
          });
        })(marker, places[i].place_name);
      }

      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx) {
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      console.log(marker);
      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
  },
  computed: {
    aa() {
      return this.files;
    },
    bb() {
      return this.markers;
    },
  },
};
</script>

<style scoped>
.outer-container {
  margin-top: 75px;
  padding: 0;
}

.bound {
  padding: 0;
  margin: 0;
}

.box {
  margin: 100px;
  margin-top: 10px;
}

.margin-area {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
