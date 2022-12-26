const fs = require("fs");

createView = (req, res) => {
  const filesPath = `./assets/files`;

  fs.readdir(filesPath, (err, files) => {
    if ( err ) {
      return console.error(`Unable to read directory: ${ err }`);
    }

    files.forEach(file => {
      const fileStream = fs.createReadStream(`${ filesPath }/${ file }`);

      fileStream.on("error", (error) => {
        console.error(`Error with file stream: ${ error }`);
        res.sendStatus(500);
      });

      fileStream.pipe(res);
    });

    res.end();
  });
}

exports.createView = createView;
