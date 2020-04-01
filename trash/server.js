var http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello");
  })
  .listen(3000, () => {
    console.log("Server is listening on PORT:3000");
  });
