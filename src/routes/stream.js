const express = require('express');
const router = express.Router();

const { createStream } = require('../api/stream');

router.get('/', (req, res) => {
  createStream(req, res);
});

module.exports = router;
