const pipe = ( range, type, size ) => {
  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, size - 1);

  const contentLength = end - start + 1;

  return {
    "Content-Range": `bytes ${ start }-${ end }/${ size }`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": type ? `video/${type}` : "audio/ogg",
  };
}

module.exports = { pipe };