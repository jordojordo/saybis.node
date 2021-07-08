const puppeteer = require("puppeteer");
const replace = require("absolutify");
const { response } = require("express");

const createTransaction = async (req, res) => {
  const { RequestTarget } = req.body;
  let url = "";

  if (!RequestTarget) {
    return response.send("No url provided");
  } else {
    try {
      RequestTarget.includes("http")
        ? (url = RequestTarget)
        : (url = "https://" + RequestTarget);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      let document = await page.evaluate(
        () => document.documentElement.outerHTML
      );
      document = replace(document, `/?url=${url.split("/")[0]}`);

      return res.send(document);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

exports.createTransaction = createTransaction;
