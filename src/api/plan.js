import { apiInstance } from "@/api/index";

const api = apiInstance();

async function findPlansByuserId(userid, page, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.get(`/plan/rest/${userid}?pgno=${page}`).then(success).catch(fail);
}

export { findPlansByuserId };
