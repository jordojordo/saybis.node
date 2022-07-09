const fs = require("fs");
const { pipe } = require("../methods/pipe");

const createStream = (req, res) => {
  const range = req.headers.range;

  if ( !range ) {
    res.status(400).send("Requires range header");
  }

  const { video } = req.query;
  const videoType = video.split(".").pop();
  const videoPath = `./assets/videos/${ video }`;
  const videoSize = fs.statSync(videoPath).size;

  const headers = pipe({ range: range, type: videoType, size: videoSize });

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
