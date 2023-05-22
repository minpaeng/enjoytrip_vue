import axios from "axios";

function createReview(review, files) {
  const FormData = require('form-data');
  const fs = require('fs');
  let data = new FormData();
  data.append('review', JSON.stringify(review), { contentType: 'application/json' });
  files.map(file => data.append('files', fs.createReadStream(file)));

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost/api/review',
    headers: { 
      'Authorization': sessionStorage.getItem("access-token"), 
      '': '', 
      ...data.getHeaders()
    },
    data : data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export { createReview };