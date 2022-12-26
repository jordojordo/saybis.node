const fs = require("fs");

const createMusicStream = (req, res) => {
  const { range } = req.headers;

  if ( !range ) {
    res.status(400).send("Requires range header");
  }

  const songPath = `./assets/music/${ req.query.song }`;
  const songSize = fs.statSync(songPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, songSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${ start }-${ end }/${ songSize }`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/ogg",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create music read stream for this particular chunk
  const musicStream = fs.createReadStream(songPath, { start, end });

  musicStream.on("error", (error) => {
    console.log(error);
    res.sendStatus(500);
  });

  // Stream the music chunk to the client
  musicStream.pipe(res);
};

exports.createMusicStream = createMusicStream;
