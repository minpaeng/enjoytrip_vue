<template>
    <body>
        <div class = "row" id = "container">
            <div class = "col md-6">
                <b-row class="text-center">
                    <div class="col m-6">
                        <h1
                        style="
                            font-weight: bold;
                            text-decoration-line: underline;
                            text-decoration-thickness: 6px;
                            text-decoration-color: rgb(189, 201, 255);
                            margin-top: 100px;
                        "
                        >
                        {{ shareBoardDto.title }}
                        </h1>
                        <p class = "text-wrapper" style = "text-align: right; margin-right: 25%; color: black">
                            방문일자: {{ shareBoardDto.visitDate }}
                        </p>
                        
                        <carousel-3d :autoplay="true" :autoplay-timeout="3000" :controls-visible="true" :controls-prev-html="'&#x2039; '" :controls-next-html="'&#x203A;'" :controls-width="10" :controls-height="30" :clickable="false">
                            <slide v-for="(filePath, index) in files" :key="parseInt(index)" :index="parseInt(index)">
                            <img :src="filePath" class="slideImage">
                            </slide>
                        </carousel-3d>
                        
                        <p class = "text-wrapper" style = "color: black; font-size: 20px;">이미지를 넘기세요</p>
                        
                        <label for="content" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: left; margin-left: 20%; margin-top: 5%;">내용:</label>
                        <input class = "fixed-size-input" type="text" id="content" name="content" value="" disabled style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 20px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px; margin-bottom: 10%;"><br>
                    </div>
                </b-row>
            </div>
            <div class = "col md-6">
                <div class="map-container">
                    <div id="map" style="width: 100%; height: 600px"></div>
                </div>
            </div>
        </div>
    </body>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2b9c9a29b813d54c215be430ea52d9db&libraries=services,clusterer,drawing"></script>

<style>

.map-container {
  position: relative;
  height: 600px;
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
  color: white; font-family: 'Lobster', cursive;
}

.carousel-3d-slide{
  height:unset !important;
}

.slideImage {
  max-width: 100%; /* Ensure the images resize proportionally within their parent container */
  max-height: 100%; /* Ensure the images resize proportionally within their parent container */
}

.carousel-3d-slide{
      box-shadow: 0 6px 6px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}
.prev[data-v-05517ad0]{
  left: 244px !important;
  top: 0px  !important;
}
.next[data-v-05517ad0]{
  right: 225px !important;
    top: 0px  !important;
}
.Next slide span{
  font-size:20px;
}
.carousel-3d-container .next span{
  font-size:40px;
  height: 100%;
}
.carousel-3d-container .prev  span{
  font-size:40px;
}
.carousel-3d-slide{
	width:400px !important;
}
</style>

<script>
import { apiInstance } from '@/api';
// import {Carousel, Slide} from 'vue-carousel';
import {Carousel3d, Slide} from 'vue-carousel-3d';
import Vue from 'vue';

const serviceKey = "h%2Bq2O463Q1WNgyJi1HEzzKzPaHFSF0C6CEK6XQSiZ2m6PiXnVMeb2VVzqs2pGTzJlId3sgvnwJf0Ur8HY4t4Aw%3D%3D";

Vue.use(Carousel3d);

// 카카오지도
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

export default {
    name: "ShareDetail",
    components: {
        Carousel3d,
        Slide,
        
    },
    data() {
        return {
            id: null,
            shareBoardDto: {},
            fileObjects: [],
            files: [],
        };
    },
    created() {},
    mounted() {
        this.id = this.$route.params.no;

        this.getShareBoardDetail();

        this.$nextTick(() => {
            setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
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
        async getShareBoardDetail() {
            try {
                let url = `http://localhost/api/review/${this.id}`
                console.log(this.id);
                let response = await apiInstance().get(
                url
                );
                this.shareBoardDto = response.data;
                this.fileObjects = response.data.files;
                
                console.log(this.shareBoardDto);
                
                for(let i = 0; i < this.fileObjects.length; i++){
                    this.files.push(this.fileObjects[i].filePath);
                }

                console.log(this.files);
                console.log(typeof this.files);

                document.getElementById("content").value = this.shareBoardDto.content;
            } catch (err) {
                console.log("후기 게시글 목록 조회 오류: " + err);
            }
        },
    },
}
</script>