<template>
  <b-container fluid class="outer-container">
    <b-row class="plan-container" align-v="start" align-h="center">
      <b-col col-12 style="padding-left: 100px; padding-right: 100px">
        <b-row>
          <router-link to="/plancreate">
            <b-button class="plan-button">계획 세우기</b-button>
          </router-link>
        </b-row>
        <b-row align-h="start" align-v="start" cols="5" style="margin: 0; padding: 0">
          <router-link v-for="plan in plans" :key="plan.id" :to="{ name: 'planDetail', params: { no: plan.id } }">
            <b-col>
              <card-item class="plan-card" :plan="plan" />
            </b-col>
          </router-link>
        </b-row>
        <b-row align-h="center">
          <template>
            <div class="overflow-auto">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageCount" use-router></b-pagination-nav>
            </div>
          </template>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CardItem from "@/components/item/CardItem.vue";
import { findPlansByuserId } from "@/api/plan";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "AppPlanBoard",
  components: {
    CardItem,
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      plans: [],
    };
  },
  created() {
    let queryPgno = this.$route.query.pgno;
    
    if (typeof queryPgno == undefined) this.page = 1;
    else this.page = Number(queryPgno);
    findPlansByuserId(
      this.userInfo.userId,
      this.page,
      ({ data }) => {
        this.plans = data.data.plans;
        this.pageCount = data.data.totalCount;
      },
      () => console.log("조회 실패")
    );
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: "/planboard",
        query: {
          pgno: pageNum,
        },
      };
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700");
@import url("https://fonts.googleapis.com/css?family=Jua:400");
.outer-container {
  padding-left: 0;
  padding-right: 0;
  padding-top: 71px;
  font-family: Jua;
}

.plan-container {
  position: relative;
  margin: 0;
  padding-top: 50px;
  width: 100%;
  height: 1000px;
  background: url("@/assets/img/main.png");
  background-size: cover;
}

.plan-container::before {
  content: "";
  opacity: 0.5;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: absolute;
  background-color: #ffffff;
}

.card-container {
  margin: 50px;
  margin-top: 30px;
  padding: 0;
}

.plan-button,
.plan-button:focus {
  margin-left: 50px;
  background-color: rgba(69, 113, 180, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.plan-button:active,
.plan-button:hover {
  background: rgba(50, 92, 156, 0.89);
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
