module.exports.httpService = (url, body) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data, "data");
    });
};
