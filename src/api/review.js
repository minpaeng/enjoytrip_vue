import { apiInstance } from "@/api/index";
import FormData from "form-data";
const api = apiInstance();

function createReview(review, files) {
  let data = new FormData();
  const blob = new Blob([JSON.stringify(review)], { type: "application/json" });
  data.append("review", blob);
  files.map((file) => data.append("files", file));

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/review",
    headers: {
      Authorization: sessionStorage.getItem("access-token"),
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  api
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert("등록 완료");
    })
    .catch((err) => {
      console.log(err);
      alert("등록 실패");
    });
}

async function getReviewList(pgno, success, fail) {
  await api.get(`/review?pgno=${pgno}`).then(success).catch(fail);
}

async function getTop3ReviewList(success, fail) {
  await api.get(`/review/top3`).then(success).catch(fail);
}

export { createReview, getReviewList, getTop3ReviewList };
