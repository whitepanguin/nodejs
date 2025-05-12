const http = require("http");

const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("test.html", (err, data) => {
      if (err) {
        res.writeHead(500); // 서버오류
        return res.end("파일 읽기 오류");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
