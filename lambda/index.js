"use strict";

// module.exports.hello = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Go Serverless v1.0! Your function executed successfully!",
//       input: event
//     })
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

const serverless = require("serverless-http");
const express = require("express");
const morgan = require("morgan");
const Jimp = require("jimp");
const app = express();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/capture-image", (req, res) => {
  const { url } = req.body;
});

module.exports.handler = serverless(app);
