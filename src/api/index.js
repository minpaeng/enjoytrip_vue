import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://192.168.208.53/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}

export { apiInstance };
