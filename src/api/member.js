import { apiInstance } from "@/api/index";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post("/member/login", JSON.stringify(user)).then(success).catch(fail);
}

export { login };
