const fs = require("fs");

const createStream = (req, res) => {
  const range = req.headers.range;

  if ( !range ) {
    res.status(400).send("Requires range header");
  }

  const { video } = req.query;
  const videoType = video.split(".").pop();
  const videoPath = `./videos/${ video }`;
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${ start }-${ end }/${ videoSize }`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": `video/${ videoType }`,
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.on("error", (error) => {
    console.log(error);
    res.sendStatus(500);
  });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};

exports.createStream = createStream;
