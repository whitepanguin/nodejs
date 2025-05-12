const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public")); // 실제 폴더 이름
//http://localhost:3000/publictest.html 이걸로 접근이 가능해짐
// 같은 방식으로 css도 입힐수 있다.
app.use("/static", express.static("public")); // /static url 접근, public 실제 폴더

app.set("view engine", "ejs");
//C:\JYL\4_nodejs_0421\views
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("<h2>홈페이지입니다. 다양한 기능을 테스트해보세요.</h2>");
});

app.get("/user/:id", (req, res) => {
  //:id 값 보내는 것
  res.send(`요청한 사용자 ID는 ${req.params.id}입니다.`);
});

//http://localhost:3000/search?word=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94&number=100
app.get("/search", (req, res) => {
  const { keyword, number } = req.query;
  res.send(`검색어: ${keyword} ${number}`);
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름: ${name} 나이: ${age}`);
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: "김사과" });
});

app.get("/posts", (req, res) => {
  const posts = [
    { title: "첫 번째 글", content: " 내용입니다" },
    { title: "두 번째 글", content: " Express는 정말 편하네요" },
  ];
  res.render("posts", { posts });
});

app.listen(port, () => {
  console.log("서버 실행 중");
});
