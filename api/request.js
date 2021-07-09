const puppeteer = require("puppeteer");
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

      const browser = await puppeteer.launch({
        args: [
          "--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure",
          "--disable-web-security",
        ],
      });
      const page = await browser.newPage();
      await page.goto(url);

      let document = await page.evaluate(
        () => document.documentElement.outerHTML
      );

      return res.send(document);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

exports.createTransaction = createTransaction;
