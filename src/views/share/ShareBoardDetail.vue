<template>
    <div>
        <div class = "row">
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
                        
                        <carousel-3d :autoplay="true" :autoplay-timeout="5000" :display="3" style = "margin-top: 10%">
                            <slide v-for="(file, index) in shareBoardDto.files" :index="index" :key="index">
                                <div class="slide-content">
                                    <img :src="file.filePath" class="slide-image" />
                                    <div class="slide-text">
                                    <p>fid: {{ file.fid }}</p>
                                    <p>filePath: {{ file.filePath }}</p>
                                    </div>
                                </div>
                            </slide>
                            <slide :index = "0" class = "slide-container">
                                Slide 1 Content
                            </slide>
                            <slide :index = "1" class = "slide-container">
                                Slide 2 Content
                            </slide>
                            <slide :index = "2" class = "slide-container">
                                Slide 3 Content
                            </slide>
                            <slide :index = "3" class = "slide-container">
                                <!-- <img :src="'https://static.javatpoint.com/computer/images/what-is-the-url.png'"/> -->
                            </slide>
                        </carousel-3d>

                        <p class = "text-wrapper" style = "color: black; font-size: 20px;">이미지를 넘기세요</p>
                        
                        <label for="content" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: left; margin-left: 20%; margin-top: 5%;">내용:</label>
                        <input type="text" id="content" name="content" value="" disabled style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 20px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px; width: 60%"><br>
                    </div>
                </b-row>
            </div>
            <div class = "col md-6">
                <p>Kimensoo</p>
            </div>
        </div>
    </div>
</template>

<style>
.test {
    font-family: 'Lobster';
}

.text-wrapper {
  color: white; font-family: 'Lobster', cursive;
}

.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slide-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
}
</style>

<script>
import { apiInstance } from '@/api';
// import {Carousel, Slide} from 'vue-carousel';
import {Carousel3d, Slide} from 'vue-carousel-3d';
import Vue from 'vue';

Vue.use(Carousel3d);

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
            responseList: [],
        };
    },
    created() {},
    mounted() {
        this.id = this.$route.params.no;
        this.getShareBoardDetail();
    },
    methods: {
        async getShareBoardDetail() {
            try {
                let response = await apiInstance().get(
                `http://localhost/api/review`
                );
                this.shareBoardDto = response.data.reviews[0];
                // console.log(this.shareBoardDto.content);
                console.log(this.shareBoardDto);

                document.getElementById("content").value = this.shareBoardDto.content;
            } catch (err) {
                console.log("공지사항 게시글 목록 조회 오류: " + err);
            }
        },
    },
}
</script>