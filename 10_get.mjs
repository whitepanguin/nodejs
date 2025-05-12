import express from "express";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  fs.readFile("login.html", (err, data) => {
    if (err) {
      res.status(500);
      return res.send("파일 읽기 오류");
    }
    res.status(200).set({ "Content-Type": "text/html" });
    res.send(data);
  });
});
// http://127.0.0.1:3000/login?userid=Apple&userpw=1234
// 원래는 get 방법 쓰면 안 되긴 함
app.get("/login", (req, res) => {
  console.log("login 호출!(GET)");
  console.log(req.query);
  console.log("아이디 : ", req.query.userid);
  console.log("비밀번호 : ", req.query.userpw);
});

app.listen(3000, () => {
  console.log("서버 실행 중");
});
