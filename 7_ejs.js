const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // 현재 경로까지 오고, view 파일에 들어가 index.ejs를 들어간다
    const filePath = path.join(__dirname, "views", "index.ejs");
    // ejs파일을 렌더링 하는 것이다. 그리고 객체 전달 가능
    ejs.renderFile(filePath, { name: "김사과" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Context-Type": "text/plain" });
        res.end("서버 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/users") {
    const filePath = path.join(__dirname, "views", "users.ejs");
    const users = ["김사과", "반하나", "이메론"];
    ejs.renderFile(filePath, { users }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Context-Type": "text/plain" });
        res.end("서버 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/posts") {
    const filePath = path.join(__dirname, "views", "posts.ejs");
    const posts = [
      { title: "첫 글", content: "안녕하세요!" },
      { title: "둘째 글", content: "Node.js 재미있어요!?" },
    ];
    ejs.renderFile(filePath, { posts }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Context-Type": "text/plain" });
        res.end("렌더링 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("페이지를 찾을 수 없습니다");
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
