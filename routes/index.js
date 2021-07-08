const express = require("express");
const router = express.Router();

const { createTransaction } = require("../api/request");

router.post("/", function (req, res) {
  createTransaction(req);
  res.send();
});

module.exports = router;
