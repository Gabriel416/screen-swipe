"use strict";

const puppeteer = require("puppeteer");
const AWS = require("aws-sdk");
const middy = require("middy");
const { cors } = require("middy/middlewares");

const uniqueIdentifier = require("./utils/uniqueIdentifier").uniqueIdentifier;

const captureImage = async (event, context, callback) => {
  const address = event["queryStringParameters"].address;
  const height = event["queryStringParameters"].height || 600;
  const width = event["queryStringParameters"].width || 1020;
  console.log(event["queryStringParameters"], "QUERY PARAMS");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/opt/headless_shell",
      args: ["--no-sandbox", "--disable-gpu", "--single-process"]
    });

    const page = await browser.newPage();
    await page.setViewport({
      height: parseFloat(height),
      width: parseFloat(width)
    });
    await page.goto(address, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    });

    const image = await page.screenshot({
      // clip: { x: 0, y: 0, width: 1024, height: 800 },
      encoding: "base64"
    });

    await page.close();
    await browser.close();

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "image/png"
      },
      body: image,
      isBase64Encoded: true
    });
  } catch (error) {
    callback("Error", {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "error occurred processing your image"
      })
    });
  }
};

const index = middy(captureImage).use(cors());
module.exports = { index };
