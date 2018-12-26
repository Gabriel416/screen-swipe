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
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const validator = require("validator");
const launchChrome = require("@serverless-chrome/lambda");
const CDP = require("chrome-remote-interface");
const Jimp = require("jimp");
const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", cors(corsOptions), (req, res) => {
  res.send("Hello World!");
});

app.post("/capture-image", cors(corsOptions), (req, res) => {
  console.log(req.body, "REQUEST");
  const { url } = req.body;
  if (validator.isURL(url)) {
    let Client;
    let Page;
    // Launch Chrome with given dimensions and without scrollbars
    launchChrome({
      chromePath: "/Applications/Google Chrome.app/",
      flags: ["--window-size=1280,1696", "--hide-scrollbars"]
    })
      // Chrome is now running on localhost:9222
      .then(() => CDP.List())
      // Connect Chrome Remote Interface
      .then(tabs => CDP({ host: "127.0.0.1:9222", target: tabs[0] }))
      .then(client => {
        // Get Network and Page from the client
        const Network = client.Network;
        Client = client;
        Page = client.Page;
        // And wait until they are enabled
        return Promise.all([Network.enable(), Page.enable()]);
      })
      // Navigate to given URL
      .then(() => Page.navigate({ url }))
      // Wait for the load event
      .then(() => Page.loadEventFired())
      // And take a screenshot
      .then(() => Page.captureScreenshot({ format: "png" }))
      .then(screenshot => {
        const { data } = screenshot;
        console.log(data, "DATA");
        let image = new Buffer(data, "base64");
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length
        });
        res.send({
          success: true,
          image: image
        });
      })
      // Chrome didn't launch correctly
      .catch(err => {
        console.log(err, "error");
      })
      .finally(() => {
        Client.close();
      });
  } else {
    res.status(400).json({
      succes: false,
      message: "invalid url"
    });
  }
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  return await handler(event, context);
};
