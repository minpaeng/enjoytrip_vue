import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}

export { apiInstance };
