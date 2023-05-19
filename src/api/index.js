import axios from "axios";

function infoBoardInstance() {
  const instance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}

// function planInstance() {

// }

export default { infoBoardInstance };
