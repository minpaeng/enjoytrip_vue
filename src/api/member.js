import { apiInstance } from "@/api/index";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post("/member/login", JSON.stringify(user)).then(success).catch(fail);
}

async function join(user, success, fail) {
  console.log(JSON.stringify(user));
  await api.post(`/member/join`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.get(`/member/info/${userid}`).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.get(`/member/logout/${userid}`).then(success).catch(fail);
}

export { login, join, findById, logout };
