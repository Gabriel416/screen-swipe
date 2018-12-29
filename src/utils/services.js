import axios from "axios";

export const httpService = (endpoint, url) => {
  axios
    .post(endpoint, {
      url,
      responseType: "stream"
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err, "err");
    });
};
// export const httpService = (url, body) => {
//   fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(body)
//   })
//     .then(res => {
//       console.log(res, "RES");
//     })
//     // .then(blob => {
//     //   const reader = new FileReader();
//     //   let data;
//     //   reader.onload = function() {
//     //     console.log(this.result, "RESULT");
//     //     data = this.result;
//     //   }; // <--- `this.result` contains a base64 data URI
//     //   console.log(data, "data");
//     //   return reader.result;
//     // })
//     .catch(err => {
//       console.log(err, "error");
//       return err;
//     });
// };
