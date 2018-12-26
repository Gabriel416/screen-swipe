module.exports.httpService = (url, body) => {
  console.log(JSON.stringify(body), "body2");
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data, "data");
      return data;
    })
    .catch(err => {
      console.log(err, "error");
      return err;
    });
};
