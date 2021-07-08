const express = require("express");
const router = express.Router();

const { createTransaction } = require("../api/request");

router.post("/", function (req, res) {
  createTransaction(req);
  res.header("Access-Control-Allow-Origin", "https://saybis.xyz");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send();
});

module.exports = router;
