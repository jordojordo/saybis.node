const fs = require("fs");
const { pipe } = require("../methods/pipe");

const createMusicStream = (req, res) => {
  const { range } = req.headers;

  if ( !range ) {
    res.status(400).send("Requires range header");
  }

  const songPath = `./assets/music/${ req.query.song }`;
  const songSize = fs.statSync(songPath).size;

  const headers = pipe({ range: range, size: songSize });

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
