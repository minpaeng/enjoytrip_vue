<template>
  <a href="">
    <div class="card">
      <div class="card-header">
        <!-- <div class="card-header-is_closed">
          <div class="card-header-text">1</div>
        </div> -->
      </div>
      <div class="card-body">
        <div class="card-body-header">
          <h3>title</h3>
          <p class="card-body-hashtag">name</p>
          <p class="card-body-nickname">content</p>
        </div>
        <p class="card-body-description">content</p>
        <div class="card-body-footer">
          <hr style="margin-bottom: 8px; opacity: 0.5; border-color: #3188cf" />
          <i class="icon icon-view_count"></i>hit <i class="icon icon-comments_count"></i>like
          <i class="reg_date"> date </i>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "CardItem",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.card {
  height: 400px;
  width: 350px;
  border-radius: 15px;
  display: inline-block;
  margin-top: 30px;
  margin-left: 30px;
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
  height: 270px;
  border-radius: 15px 15px 0 0;
  background-image: url("@/assets/img/main.png");
  background-size: 100% 280px;
  background-repeat: no-repeat;
}

.card:hover .card-header {
  opacity: 0.8;
  height: 100px;
}

.card-header-is_closed {
  background-color: #318aef;
  color: #fff;
  font-weight: bold;
  text-align: center;
  float: right;
  margin: 15px 15px 0 0;
  border-radius: 50%;
  font-weight: bold;
  padding: 10px 10px;
  line-height: 20px;
}
</style>
