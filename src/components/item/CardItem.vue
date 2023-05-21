<template>
  <a href="">
    <div class="card">
      <div class="card-header" :style="img">
        <!-- <div class="card-header-is_closed">
          <div class="card-header-text">1</div>
        </div> -->
      </div>
      <div class="card-body">
        <div class="card-body-header">
          <h5>{{ plan.title }}</h5>
          <p>{{ cardStartDate }} ~ {{ cardEndDate }}</p>
          <!-- <p>{{ plan.memo }}</p> -->
          <p>작성자: {{ plan.userId }}</p>
        </div>
        <div class="card-body-footer">
          <hr style="margin-bottom: 3px; opacity: 0.5; border-color: #3188cf" />
          추천수: 0
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "CardItem",
  components: {},
  props: {
    plan: Object,
  },
  data() {
    return {
      img: "",
    };
  },
  created() {
    this.img = `background-image: url(${this.plan.attractionList[0].firstImage})`;
    if (this.img == undefined || this.img == null) this.img = "@/assets/img/main.png";
  },
  methods: {},
  computed: {
    cardStartDate() {
      return this.plan.startDate.split(" ")[0];
    },
    cardEndDate() {
      return this.plan.endDate.split(" ")[0];
    },
  },
};
</script>

<style scoped>
.card {
  height: 300px;
  width: 250px;
  border-radius: 15px;
  display: inline-block;
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 30px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow: hidden;
}

.card-header {
  -webkit-transition: 0.5s; /*사파리 & 크롬*/
  -moz-transition: 0.5s; /*파이어폭스*/
  -ms-transition: 0.5s; /*인터넷 익스플로러*/
  -o-transition: 0.5s; /*오페라*/
  transition: 0.5s;
  width: 100%;
  height: 180px;
  border-radius: 15px 15px 0 0;
  /* background-image: url("@/assets/img/main.png"); */
  background-size: 100% 220px;
  background-repeat: no-repeat;
}

.card:hover .card-header {
  opacity: 0.8;
  height: 120px;
}
</style>
