<template>
  <div
    id="outer"
    class="container"
    style="
      max-width: 1800px; /* Adjust the value to your desired width */
      margin-left: auto;
      margin-right: auto;
    "
  >
    <!-- 중앙 center content end -->
    <div>
      <div class="row-md-8" style="margin-top: 100px">
        <div class="row" style="font-family: 'Black Han Sans', sans-serif">
          <div class="col-md-4" style="overflow: auto; max-height: 660px">
            <h2 class="map-title" style="position: sticky">추천 여행지</h2>
            <table id="under-table" class="table table-striped">
              <thead>
                <tr>
                  <th>대표이미지</th>
                  <th>관광지명</th>
                  <th>주소</th>
                  <th>담기</th>
                </tr>
              </thead>
              <tbody>
                <!-- trip-List -->
                <tr
                  v-for="attraction in this.recommendAttractions"
                  :key="attraction.contentId"
                  @click="moveCenter(attraction.latitude, attraction.longitude)"
                >
                  <td><img :src="attraction.firstImage" width="100px" /></td>
                  <td>{{ attraction.title }}</td>
                  <td>{{ attraction.addr1 }} {{ attraction.addr2 }}</td>
                  <td><button @click="buttonClicked(attraction.contentId)">담기</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-8">
            <h2 class="map-title">여행을 떠나요</h2>
            <div class="map-container">
              <div id="map" style="width: 100%; height: 600px"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bordered-container">
        <div class="col-md-12">
          <h2 class="map-title">검색된 여행지</h2>
        </div>
        <div class="col-md-12">
          <form class="my-3 fill-row-form" onsubmit="return false;" role="search">
            <select
              id="search-area"
              class="form-select me-2"
              v-model="sido"
              @change="showValue(sido)"
            >
              <option value="0" selected>검색 할 지역 선택</option>
              <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido.sidoCode">
                {{ sido.sidoName }}
              </option>
            </select>
            <select id="search-town" class="form-select me-2" v-model="gugun">
              <option value="0" selected>구군 선택</option>
              <option
                v-for="gugun in filteredGuguns"
                :key="gugun.gugunCode"
                :value="gugun.gugunCode"
              >
                {{ gugun.gugunName }}
              </option>
            </select>
            <select id="search-content-id" class="form-select me-2">
              <option value="0" selected>관광지 유형</option>
              <option value="12">관광지</option>
              <option value="14">문화시설</option>
              <option value="15">축제공연행사</option>
              <option value="25">여행코스</option>
              <option value="28">레포츠</option>
              <option value="32">숙박</option>
              <option value="38">쇼핑</option>
              <option value="39">음식점</option>
            </select>
            <button
              id="btn-search"
              class="btn btn-outline-success"
              type="button"
              @click="getAttractions()"
            >
              검색
            </button>
          </form>
        </div>
        <div
          class="row"
          style="font-family: 'Black Han Sans', sans-serif; overflow: auto; max-height: 500px"
        >
          <div class="col-md-12">
            <table id="under-table" class="table table-striped" style="display: ">
              <thead>
                <tr>
                  <th>대표이미지</th>
                  <th>관광지명</th>
                  <th>주소</th>
                  <th>담기</th>
                </tr>
              </thead>
              <tbody>
                <!-- trip-List -->
                <tr
                  v-for="area in this.areas"
                  :key="area.contentId"
                  @click="moveCenter(area.latitude, area.longitude)"
                >
                  <td><img :src="area.firstImage" width="100px" /></td>
                  <td>{{ area.title }}</td>
                  <td>{{ area.addr1 }} {{ area.addr2 }}</td>
                  <td>{{ area.contentId }}</td>
                  <td><button @click="buttonClicked(area.contentId)">담기</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row-md-4 ms-5 me-5">
        <!-- 관광지 검색 start -->
        <!-- 기존 옵션 선택 -->

        <!-- content for the right column goes here -->
        <form>
          <div class="row mb-3 mt-3">
            <div class="col-md-6">
              <i class="bi bi-calendar2-date text-primary"></i>
              <label for="startDate" class="form-label">여행시작:</label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                name="startDate"
                v-model="plan.startDate"
              />
            </div>
            <div class="col-md-6">
              <i class="bi bi-calendar2-date text-danger"></i>
              <label for="endDate" class="form-label">여행 끝:</label>
              <input
                type="date"
                class="form-control"
                id="endDate"
                name="endDate"
                v-model="plan.endDate"
              />
            </div>
          </div>
          <div class="mb-3">
            <i class="bi bi-patch-question" style="color: rgb(121, 2, 119)"></i>
            <label for="title" class="form-label">제목:</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="제목 입력"
              name="title"
              v-model="plan.title"
            />
          </div>
          <div class="mb-3">
            <i class="bi bi-pencil-square" style="color: rgb(14, 2, 121)"></i>
            <label for="memo" class="form-label">여행정보:</label>
            <textarea id="memo" name="memo" class="form-control" v-model="plan.memo"></textarea>
          </div>

          <!-- 여기 삽입 추가 등등 -->
          <div id="poll-answer-list">
            <div class="row mb-1 poll-answer-list-item">
              <div class="col-md-12">
                <table id="top-table" class="w-100" style="display: none">
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>대표이미지</th>
                      <th>관광지명</th>
                      <th>주소</th>
                      <th>삭제</th>
                      <!-- New column for delete button -->
                    </tr>
                  </thead>
                  <tbody id="trip-select">
                    <tr
                      v-for="(attraction, index) in attractionList"
                      :key="attraction.contentId"
                      @click="moveCenter(attraction.latitude, attraction.longitude)"
                    >
                      <td>{{ index + 1 }}</td>
                      <td><img :src="attraction.firstImage" width="100px" /></td>
                      <td>{{ attraction.title }}</td>
                      <td>{{ attraction.addr1 }} {{ attraction.addr2 }}</td>
                      <td><button @click="deleteAttraction(attraction)">삭제</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center align-items-center">
            <b-button @click="makePlan">생성하기</b-button>
            <button type="button" class="btn btn-outline-danger btn-lg" data-bs-dismiss="modal">
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- kakao map end -->
    <!-- 관광지 검색 end -->
    <!-- </div> -->
    <!-- 중앙 content end -->
    <div class="popup-overlay" v-if="isOpen">
      <div class="popup-content">
        <h4>알림</h4>
        <p>이미 등록된 여행지입니다. 그래도 등록하시겠습니까?</p>
        <button @click="forceInsert">예</button>
        <button @click="closeModal">아니오</button>
      </div>
    </div>
  </div>
</template>

<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2b9c9a29b813d54c215be430ea52d9db&libraries=services,clusterer,drawing"
></script>

<script>
// index page 로딩 후 전국의 시도 설정.

const serviceKey =
  "h%2Bq2O463Q1WNgyJi1HEzzKzPaHFSF0C6CEK6XQSiZ2m6PiXnVMeb2VVzqs2pGTzJlId3sgvnwJf0Ur8HY4t4Aw%3D%3D";

//let areaUrl = `${root}/attraction/rest`;
let areaUrl = `http://localhost/attraction/rest`;

fetch(areaUrl, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => makeOption(data));

function makeOption(data) {
  let trips = data;
  let sel = document.getElementById("search-area");

  trips.forEach((area) => {
    let opt = document.createElement("option");

    opt.setAttribute("value", area.sidoCode);

    opt.appendChild(document.createTextNode(area.sidoName));

    sel.appendChild(opt);
  });
}

document.getElementById("btn-search").addEventListener("click", () => {
  let areaCode = 0;
  let townCode = 0;
  let contentTypeId = 0;

  if (parseInt(document.getElementById("search-area").value))
    areaCode = document.getElementById("search-area").value;
  if (parseInt(document.getElementById("search-town").value))
    townCode = document.getElementById("search-town").value;
  if (parseInt(document.getElementById("search-content-id").value))
    contentTypeId = document.getElementById("search-content-id").value;

  let searchUrl =
    `${root}/attraction/selectByAll?contentTypeId=` +
    contentTypeId +
    `&sidoCode=` +
    areaCode +
    `&gugunCode=` +
    townCode;

  fetch(searchUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => makeList(data));
});

// 카카오지도
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
</script>

<script>
import axios from "axios";
import VueSanitize from "vue-sanitize";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "PlanCreate",
  filters: {
    sanitize: VueSanitize,
  },
  data() {
    return {
      waitModal: false,
      isOpen: false,
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      map: null,
      markers: [],
      infowindow: null,
      sidos: [],
      sido: "",
      guguns: [],
      gugun: "",
      attractions: [],
      positions: [],
      dynamicContent: "",
      areas: [],
      attractionList: [],
      forceInsertClick: false,
      recommendAttractions: [],
      plan: {
        userId: "",
        startDate: null,
        endDate: null,
        memo: "",
        title: "",
        share: "N",
        contentIds: [],
      },
    };
  },
  created() {
    this.getSido();
    this.getRecommend(null);
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    filteredGuguns() {
      if (this.sido !== "0") {
        return this.guguns.filter((gugun) => gugun.sidoCode === this.sido);
      } else {
        return this.guguns;
      }
    },
    sanitizedDynamicContent() {
      return this.dynamicContent;
    },
  },
  mounted() {
    this.plan.userId = this.userInfo.userId;
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
  },
  methods: {
    deleteAttraction(attraction) {
      // Find the index of the attraction in the attractionList
      const index = this.attractionList.findIndex((a) => a.contentId === attraction.contentId);

      if (index !== -1) {
        // Remove the attraction from the attractionList
        this.attractionList.splice(index, 1);
        this.plan.contentIds.splice(index, 1);
      }
    },
    openModal() {
      this.isOpen = true;
      this.waitModal = true;
    },
    closeModal() {
      this.isOpen = false;
      this.forceInsertClick = false;
      this.waitModal = false;
    },
    forceInsert() {
      this.isOpen = false;
      this.forceInsertClick = true;
      this.waitModal = false;
    },
    moveCenter(lat, lng) {
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
    },
    async getAttractions() {
      this.areas = [];

      const sidoCode = this.sido;
      const gugunCode = this.gugun;
      const contentTypeId = document.getElementById("search-content-id").value;

      // Do something with the response data
      // send GET request to server
      const url = `http://localhost/attraction/rest/${contentTypeId}/${sidoCode}/${gugunCode}`;
      axios
        .get(url)
        .then((response) => {
          this.attractions = response.data.list;
        })
        .then(() => this.makeList(this.attractions))
        .catch((error) => {
          console.log(error);
        });
    },
    getRecommend(prevAttraction) {
      if (prevAttraction === null) {
        axios
          .get("http://localhost/attraction/rest/12/1/1")
          .then((response) => {
            this.recommendAttractions = response.data.list;
            console.log(this.recommendAttractions);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getSido() {
      axios
        .get("http://localhost/attraction/rest")
        .then((response) => {
          this.sidos = response.data.sido;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showValue(code) {
      let sel = document.getElementById("search-town");
      sel.innerHTML = "";
      let townUrl = `http://localhost/attraction/rest/` + code;

      fetch(townUrl)
        .then((response) => response.json())
        .then((data) => {
          // Process the response data here and update the guguns array
          this.guguns = data.gugun;
        })
        .catch((error) => console.error(error));
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
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
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
    buttonClicked(contentId) {
      const url = `http://localhost/attraction/rest/contentId/${contentId}`;

      axios
        .get(url)
        .then((response) => {
          this.selectList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showPopup(message) {
      // Create the popup elements
      const overlay = document.createElement("div");
      overlay.className = "popup-overlay";

      const content = document.createElement("div");
      content.className = "popup-content";

      const closeBtn = document.createElement("span");
      closeBtn.className = "popup-close";
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });

      const popupMessage = document.createElement("p");
      popupMessage.textContent = message;

      // Add elements to the popup
      content.appendChild(popupMessage);
      content.appendChild(closeBtn);
      overlay.appendChild(content);

      // Add the popup to the body
      document.body.appendChild(overlay);
    },
    selectList(data) {
      document.querySelector("#top-table").setAttribute("style", "display: ;");

      for (const attraction of this.attractionList) {
        if (attraction.contentId === data.attractionDto.contentId) {
          this.isOpen = true;

          while (this.waitModal === true) {}

          if (this.forceInsertClick === false) return;
        }
      }

      this.attractionList.push({
        contentId: data.attractionDto.contentId,
        latitude: data.attractionDto.latitude,
        longitude: data.attractionDto.longitude,
        firstImage: data.attractionDto.firstImage,
        title: data.attractionDto.title,
        addr1: data.attractionDto.addr1,
        addr2: data.attractionDto.addr2,
      });

      this.plan.contentIds.push(data.attractionDto.contentId);
    },
    makeList(data) {
      document.querySelector("#under-table").setAttribute("style", "display: ;");
      let trips = data;

      trips.forEach((area) => {
        this.areas.push({
          contentId: area.contentId,
          firstImage: area.firstImage,
          title: area.title,
          addr1: area.addr1,
          addr2: area.addr2,
          latitude: area.latitude,
          longitude: area.longitude,
        });
        let markerInfo = {
          title: area.title,
          latlng: new kakao.maps.LatLng(area.latitude, area.longitude),
        };

        this.positions.push(markerInfo);
      });

      this.displayMarker();
    },
    async makePlan() {
      const instance = axios.create({
        baseURL: "http://localhost/api/plan",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("access-token"),
        },
      });
      await instance
        .post("/rest", this.plan)
        .then(() => {
          alert("플랜 생성 완료");
          this.$router.push({ name: "planboard", query: { pgno: 1 } });
        })
        .catch((err) => {
          console.log(err);
        });

        this.$router.push(`/planboard?pgno=1`);
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 300px;
  overflow-y: auto;
}

/* Styling for the popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  text-align: center;
}

.map-container {
  position: relative;
  height: 600px;
  margin-bottom: 70px;
  padding-bottom: 0;
}

.map-title {
  top: 0;
  text-align: center;
  background-color: #155b8a;
  padding: 10px;
  margin: 0;
  color: white;
  z-index: 999;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.row {
  display: flex; /* equal height of the children */
}

.col {
  flex: 1; /* additionally, equal width */

  padding: 1em;
  border: solid;
}
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-container form {
  width: 100%;
}
.fill-row-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Adjust the number of columns as needed */
  gap: 10px; /* Adjust the gap size as needed */
}
.fill-row-form select,
.fill-row-form button {
  flex-grow: 1;
}

.bordered-container {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
}
</style>
