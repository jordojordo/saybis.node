const fs = require("fs");

const createMusicStream = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires range header");
  }

  const { music } = req.query;
  const musicPath = `./assets/music/${music}`;
  const musicSize = fs.statSync(musicPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, musicSize - 1);

  // create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${musicSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mpeg",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create music read stream for this particular chunk
  const musicStream = fs.createReadStream(musicPath, { start, end });
  musicStream.on("error", (error) => {
    console.log(error);
    res.sendStatus(500);
  });

  // Stream the music chunk to the client
  musicStream.pipe(res);
};

exports.createMusicStream = createMusicStream;
