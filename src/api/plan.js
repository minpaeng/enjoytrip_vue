import { apiInstance } from "@/api/index";

const api = apiInstance();

async function findPlansByuserId(userid, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.get(`/plan/rest/${userid}`).then(success).catch(fail);
}

export { findPlansByuserId };
