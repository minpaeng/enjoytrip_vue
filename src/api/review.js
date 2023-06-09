import { apiInstance } from "@/api/index";
import FormData from "form-data";
const api = apiInstance();

function createReview(review, files, success, fail) {
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

  api.request(config).then(success).catch(fail);
}

async function getReviewList(pgno, success, fail) {
  await api.get(`/review?pgno=${pgno}`).then(success).catch(fail);
}

async function getTop3ReviewList(success, fail) {
  await api.get(`/review/top3`).then(success).catch(fail);
}

async function getReview(reviewId, success, fail) {
  await api.get(`/review/${reviewId}`).then(success).catch(fail);
}

async function checkLike(like, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.get(`/great/${like.userId}/${like.reviewId}`, like).then(success).catch(fail);
}

async function makeLike(like, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.post(`/great`, like).then(success).catch(fail);
}

async function deleteLike(like, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("access-token");
  await api.delete(`/great/${like.userId}/${like.reviewId}`, like).then(success).catch(fail);
}

export { createReview, getReviewList, getTop3ReviewList, getReview, makeLike, deleteLike, checkLike };
