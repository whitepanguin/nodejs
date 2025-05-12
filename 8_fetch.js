const http = require("http");
const skills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "Java" },
  { name: "Python" },
  { name: "Ai" },
  { name: "Node.js" },
  { name: "MySQL" },
  { name: "mongoDB" },
];
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 모든 포트 번호에 대해서 접속을 허용하겠다.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const url = req.url;
  const method = req.method;
  if (method == "GET") {
    //url을 통한 데이터는 무조건 GET 방식이다.
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(skills));
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
