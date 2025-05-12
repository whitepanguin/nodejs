import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("post에 존재하는 미들웨어");
  next();
});
//127.0.0.1:3000/posts
router.get("/", (req, res) => {
  res.status(200).send("GET: /posts 게시글 가져오기");
});

router.post("/", (req, res) => {
  res.status(201).send("POST: /posts 게시글 작성");
});

router.put("/:id", (req, res) => {
  res.status(201).send(`PUT: /posts/:id ${req.params.id}번 게시판 수정`);
});

router.delete("/:id", (req, res) => {
  res.status(204).send(`DELET: /posts/:id ${req.params.id}번 게시판 삭제`);
});

export default router;
