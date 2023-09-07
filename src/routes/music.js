const express = require('express');
const router = express.Router();

const { createMusicStream } = require('../api/music');

router.get('/', (req, res) => {
  createMusicStream(req, res);
});

module.exports = router;
