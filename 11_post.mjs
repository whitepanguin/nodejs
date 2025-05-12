import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true })); // post요청용, 아래 에러를 없애준다

//이럴때 포스트맨을 쓰는거다
app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;
  console.log("아이디: ", userid);
  console.log("비밀번호: ", userpw);
  res.send(`아이디: ${userid}, 비밀번호: ${userpw}`);
});
//Cannot destructure property 'userid' of 'req.body' as it is undefined.
// nodejs는 폼으로 그냥 못 받는다.

app.listen(3000, () => {
  console.log("서버 실행 중");
});
