"use strict";

const fs = require("fs");
const cors = require("cors");
const validator = require("validator");
const launchChrome = require("@serverless-chrome/lambda");
const Cdp = require("chrome-remote-interface");
const Jimp = require("jimp");

module.exports.handler = async (event, context, callback) => {
  console.log(event, "EVENT");
  const requestBody = JSON.parse(event.body);
  console.log(requestBody, "EVENT BODY");
  const url = requestBody.url;
  console.log(url, "URL");

  if (validator.isURL(url)) {
    let client;
    let result;
    let browserTab;

    try {
      await launchChrome({
        chromePath: "/Applications/Google Chrome.app/",
        flags: ["--window-size=1280,1696", "--hide-scrollbars"]
      });

      const [tab] = await Cdp.List();
      browserTab = tab;
      client = await Cdp({ host: "127.0.0.1", target: tab });

      const { Network, Page, Runtime, Emulation } = client;

      Network.requestWillBeSent(params => {
        // console.log("Chrome is sending request for:");
      });

      await Promise.all([Network.enable(), Page.enable()]);

      await Page.navigate({ url });
      await Page.loadEventFired();
      const screenshot = await Page.captureScreenshot({ format: "png" });
      console.log(screenshot, "screenshot");
      result = screenshot.data;

      return callback(null, {
        statusCode: 200,
        body: result.toString("base64"),
        isBase64Encoded: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "image/png"
        }
      });
    } catch (error) {
      return callback(error);
    } finally {
      if (client) {
        console.log("HIT");
        await client.close();
      }
    }
  } else {
    return callback("Error", {
      statusCode: 400,
      message: "Invalid url"
    });
  }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: "Go Serverless v1.0! Your function executed successfully!",
  //     input: event
  //   })
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
