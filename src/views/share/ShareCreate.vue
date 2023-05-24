<template>
  <b-container fluid class="outer-container">
    <b-row align-h="center" align-v="center" style="margin: 0; padding: 30px">
      <h4><strong>후기 작성</strong></h4>
    </b-row>
    <b-row class="bound box">
      <b-col cols="6" class="bound">
        <b-row class="bound">
          <b-col cols="12" class="bound">
            <b-row>
              <b-col cols="2" class="margin-area"><label>제목</label></b-col>
              <b-col cols="10" class="margin-area">
                <b-form-input v-model="review.title" placeholder="제목"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" class="margin-area"><label>내용</label></b-col>
              <b-col cols="10" class="margin-area">
                <b-form-textarea id="textarea" v-model="review.content" placeholder="내용" rows="3" max-rows="6"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" class="margin-area">
                <label>방문날짜</label>
              </b-col>
              <b-col cols="10" class="margin-area">
                <b-form-datepicker id="example-datepicker" v-model="review.visitDate" class="mb-2" placeholder="날짜 선택"></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" class="margin-area">
                <label>사진첨부</label>
              </b-col>
              <b-col cols="10" class="margin-area">
                <b-form-file multiple v-model="files" :state="Boolean(files)" placeholder="파일 선택" drop-placeholder=" 드래그해서 넣기"></b-form-file>
                <b-col cols="12" v-for="(file, index) in files" :key="index" class="margin-area">
                  {{ file ? file.name : "" }}
                </b-col>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="spot-info">
            <b-row>
              <b-col cols="2" class="margin-area">방문장소:</b-col>
              <b-col cols="10" class="margin-area">{{ review.spotName }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="2" class="margin-area">주소:</b-col>
              <b-col cols="10" class="margin-area">{{ review.spotAddress }}</b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-button class="share-button" @click="create">작성하기</b-button>
      </b-col>
      <b-col cols="6" class="bound">
        <div class="map_wrap">
          <div id="map"></div>

          <div id="menu_wrap" class="bg_white">
            <div class="option">
              <div>
                <form>
                  키워드 : <input type="text" v-model="keyword" id="keyword" size="15" />
                  <b-button @click="searchPlaces" style="padding-left: 10px; padding-right: 10px">검색</b-button>
                </form>
              </div>
            </div>
            <hr />
            <ul id="placesList"></ul>
            <div id="pagination"></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createReview } from "@/api/review";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "ShareCreate",
  components: {},
  data() {
    return {
      map: null,
      markers: [],
      itemStr: "",
      ps: null,
      keyword: "",
      date: "",
      files: [],
      review: {
        userId: "",
        title: "",
        content: "",
        visitDate: "",
        spotName: "",
        spotAddress: "",
        x: "",
        y: "",
      },
    };
  },
  created() {
    this.review.userId = this.userInfo.userId;
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}&&libraries=services`;
      document.head.appendChild(script);
    }
  },
  methods: {
    // 리뷰 작성 요청
    async create() {
      await createReview(this.review, this.files);
      this.$router.push({ name: "shareboard", query: { pgno: 1 } });
    },
    // 맵 초기화
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.ps = new kakao.maps.services.Places();
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
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        this.displayPlaces(data);
        // console.log(data);
        // 페이지 번호를 표출합니다
        this.displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    },

    setSpotInfo(place) {
      this.review.spotName = place.place_name;
      this.review.spotAddress = place.address_name;
      this.review.x = place.x;
      this.review.y = place.y;
    },

    addEvent(marker, place, infowindow, itemEl) {
      let self = this;
      kakao.maps.event.addListener(marker, "mouseover", function () {
        let content = `<div style="padding:5px;z-index:1;font-family: Jua;">${place.place_name}</div>`;
        infowindow.setContent(content);
        infowindow.open(self.map, marker);
      });
      kakao.maps.event.addListener(marker, "click", function () {
        self.setSpotInfo(place);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      itemEl.onmouseover = function () {
        let content = `<div style="padding:5px;z-index:1;">${place.place_name}</div>`;
        infowindow.setContent(content);
        infowindow.open(self.map, marker);
      };

      itemEl.onmouseout = function () {
        infowindow.close();
      };
    },

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      this.removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = this.addMarker(placePosition, i),
          itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        this.addEvent(marker, places[i], infowindow, itemEl);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);
    },

    // 검색결과 항목을 Element로 반환하는 함수입니다
    getListItem(index, places) {
      var el = document.createElement("li");
      this.itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info" style="font-family: Jua">' +
        "   <h6><strong>" +
        (index + 1) +
        ". " +
        places.place_name +
        "</strong></h6>";

      if (places.road_address_name) {
        this.itemStr += "    <div>" + places.road_address_name + "</div>" + '   <div class="jibun gray">' + places.address_name + "</div>";
      } else {
        this.itemStr += "    <div>" + places.address_name + "</div>";
      }

      this.itemStr += '  <div class="tel">' + places.phone + "</div>" + "</div>";

      el.innerHTML = this.itemStr;
      el.className = "item";

      return el;
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

      // console.log(marker);
      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    },

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700");
@import url("https://fonts.googleapis.com/css?family=Jua:400");

#map {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.share-button,
.share-button:focus {
  background-color: rgba(69, 113, 180, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.share-button:active,
.share-button:hover {
  background: rgba(50, 92, 156, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

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

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}

.spot-info {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 16px;
  border-radius: 10px;
  border: 1px solid #8484842c;
  text-align: start;
  width: 100%;
}
</style>
