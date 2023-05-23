<template>
  <div id="outer" style="margin-left: auto; margin-right: auto; margin-top: 100px">
    <b-row class="text-center">
      <div class="col m-5">
        <h1
          style="
            font-weight: bold;
            text-decoration-line: underline;
            text-decoration-thickness: 6px;
            text-decoration-color: rgb(189, 201, 255);
          "
        >
          여행 계획
        </h1>
      </div>
    </b-row>

    <div class="row" style="margin-left: auto;">
      <div class="col-md-6 d-flex flex-column align-items-end">
        <label for="title" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: right; margin-right: 25%;">계획 이름:</label>
        <input type="text" id="title" name="title" value="" disabled oninput="adjustWidth(this)" style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 30px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px;"><br>
      </div>
      <div class="col-md-6 d-flex flex-column align-items-start">
        <label for="startDate" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: right; margin-right: 25%;">출발일: </label>
        <input type="text" id="startDate" name="startDate" value="" disabled oninput="adjustWidth(this)" style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 30px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px;"><br>
      </div>
    </div>
    <div class="row" style="margin-left: auto;">
      <div class="col-md-6 d-flex flex-column align-items-end">
        <label for="endDate" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: right; margin-right: 25%;">도착일:</label>
        <input type="text" id="endDate" name="endDate" value="" disabled oninput="adjustWidth(this)" style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 30px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px;"><br>
      </div>
      <div class="col-md-6 d-flex flex-column align-items-start">
        <label for="userId" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: right; margin-right: 25%;">작성자:</label>
        <input type="text" id="userId" name="userId" value="" disabled oninput="adjustWidth(this)" style="font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 30px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px;"><br>
      </div>
    </div>
    <div class="row" style="margin-left: auto;">
      <div class="col-md-12">
        <label for="memo" class="text-wrapper" style="color: black; font-size: 20px; display: block; text-align: center; margin-right: 30%;">내용:</label>
        <input type="text" id="memo" name="memo" value="" disabled style="width: 40%; font-family: 'Lobster', sans-serif; font-weight: bold; font-size: 30px; color: #333; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 10px;"><br>
      </div>
    </div>

    <b-row class="text-center">
      <div class="col m-5">
        <h1
          style="
            font-weight: bold;
            text-decoration-line: underline;
            text-decoration-thickness: 6px;
            text-decoration-color: rgb(189, 201, 255);
          "
        >
          타임라인
        </h1>
      </div>
    </b-row>

    <div class="timeline" style = "margin-top: 20px">
      <div v-for="(attraction, index) in attractions" :key="index" :class="['container', index % 2 === 0 ? 'left' : 'right']">
        <div class="content">
          <div class="image-container" v-if="index % 2 === 0">
            <img :id="'rightImg-' + index" :src="attraction.firstImage" width="300px" style = "border-radius: 50%;" />
          </div>
          <div class="text-container">
            <p class ="text-wrapper" style ="font-size: 30px;">{{ attraction.title }}</p>
            <p class = "text-wrapper" style="font-size: 12px">{{ attraction.addr1 }}</p>
          </div>
          <div class="image-container" v-if="index % 2 !== 0">
            <img id="rightImg" :src="attraction.firstImage" width="300px" style = "border-radius: 50%;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-wrapper {
  color: white; font-family: 'Lobster', cursive;
}
/* 
.bordered-container {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
} */

.map-title {
  position: sticky;
  top: 0;
  padding: 10px;
  text-align: center;
  color: black;
}

* {
  box-sizing: border-box;
}

/* Set a background color */
body {
  background-color: #116fad;
  font-family: Helvetica, sans-serif;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  display: inline-block;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: black;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -12px;
  background-color: white;
  border: 4px solid #FF9F55;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  right: 50%;
}

/* Place the container to the right */
.right {
  left: 50.6%
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid black;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -16px;
}

/* The actual content */
.content {
  background-color: #116fad;
  position: relative;
  align-items: center;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}

.image-container{
  flex: 1;
  padding: 0 5px;
}

.text-container {
  flex: 1;
  padding: 0 15px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

/* Full-width containers */
  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

/* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid black;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

/* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 15px;
  }

/* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}

.legend {
  display: block;
  padding-left: 2px;
  padding-right: 2px;
  border: none;
}
</style>

<script>
import {apiInstance} from "@/api/index";

export default {
  name: "PlanDetail",
  components: {
  },
  data() {
    return {
      id: null,
      planDto: {},
      attractions: [],
    };
  },
  created() {
  },
  mounted() {
    this.id = this.$route.params.no;
    this.getPlanDetail();
  },
  methods: {
    async getPlanDetail() {
      try {
        let response = await apiInstance().get(
          `http://localhost/api/plan/${this.id}`
        );
        this.planDto = response.data.planAttractionDto;
        console.log(this.planDto);
        this.attractions = this.planDto.attractionList;
        console.log(this.attractions);
        for(let i = 0; i < this.attractions.length; i++){
          if (this.attractions[i].firstImage === ''){
            this.attractions[i].firstImage = "https://www.pharmaceutical-business-review.com/wp-content/themes/goodlife-wp-child/assets/img/no_image_available.jpg";
          }          
        }

        console.log(this.planDto);
        console.log(this.planDto.title);
        document.getElementById("title").value = this.planDto.title;
        document.getElementById("startDate").value = this.planDto.startDate;
        document.getElementById("endDate").value = this.planDto.endDate;
        document.getElementById("userId").value = this.planDto.userId;
        document.getElementById("memo").value = this.planDto.memo;
      } catch (err) {
        console.log("공지사항 게시글 목록 조회 오류: " + err);
      }
    },

    async deleteInfoPost() {
      try {
        await apiInstance().delete(`/information/delete/${this.id}`);
        alert("삭제 완료");
        this.$router.push("/infoboard");
      } catch (err) {
        console.log(`공지사항 게시글 삭제 실패: ${err}`);
      }
    },
    adjustWidth(element) {
      element.style.width = element.scrollWidth + "px";
    },
    navTo(location) {
      if (location === "infoboard") this.$router.push(`/${location}?pgno=1`);
      else {
        this.$router.push({ path: `/infoboard/${location}/${this.id}` });
      }
    },
  },
};
</script>