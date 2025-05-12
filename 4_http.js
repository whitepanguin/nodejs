const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  // 127.0.0.1:3000/
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("home.");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("my page.");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("no page found");
  }
  //req: 요청정보(유저 데이터) (url, method, headers 등)
  //res: 응답 처리 객체
  //헤더에다 쓸 데이터 200번은 정상적인 호출이라는 뜻
});
// 127.0.0.1 || localhost ipconfig -> ipv4 주소
server.listen(3000, () => {
  console.log("서버 실행 중");
});
