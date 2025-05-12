console.log("6_json.js 실행");
console.log("nodemon 실행중!");

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/api/user") {
    const user = {
      name: "김사과",
      age: 20,
      job: "개발자",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000);
