const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((request, response) => {
    if (request.url === "/main.js") {
      fs.createReadStream(
        __dirname + "/SortAnimation" + "/selection/main.js"
      ).pipe(response);
    } else {
      fs.createReadStream(
        __dirname + "/SortAnimation" + "/selection/index.html"
      ).pipe(response);
    }
  })
  .listen(3000, (_) => {
    console.log("http://localhost:3000");
  });
