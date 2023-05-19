<template>
  <b-container fluid class="outer-container">
    <b-row class="plan-container" align-v="center" align-h="start">
      <b-col md="auto">
        <router-link to="/plancreate">
          <b-button class="plan-button">계획 세우기</b-button>
        </router-link>
      </b-col>
      <b-col md="auto">
        <b-row class="card-container" align-h="center">
          <card-item v-for="index in 10" :key="index" class="plan-card" />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CardItem from "@/components/item/CardItem.vue";

export default {
  name: "AppPlanBoard",
  components: {
    CardItem,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.outer-container {
  padding-left: 0;
  padding-right: 0;
  padding-top: 71px;
}

.plan-container {
  position: relative;
  margin: 0;
  padding-top: 30px;
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
  margin: 3%;
  margin-right: 8%;
}

.plan-button,
.plan-button:focus {
  margin-left: 10px;
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
