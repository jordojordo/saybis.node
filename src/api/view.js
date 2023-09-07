const fs = require('fs');

const createView = (req, res) => {
  const filesPath = `./assets/files`;

  fs.readdir(filesPath, (err, files) => {
    if ( err ) {
      return console.error(`Unable to read directory: ${ err }`); // eslint-disable-line no-console
    }

    files.forEach((file) => {
      const fileStream = fs.createReadStream(`${ filesPath }/${ file }`);

      fileStream.on('error', (error) => {
        console.error(`Error with file stream: ${ error }`); // eslint-disable-line no-console
        res.sendStatus(500);
      });

      fileStream.pipe(res);
    });

    res.end();
  });
};

exports.createView = createView;
