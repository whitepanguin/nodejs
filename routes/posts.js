const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     responses:
 *       200:
 *         description: 게시글 목록 성공 응답
 *   post:
 *     summary: 새 게시글 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성 성공
 */
router.get("/", (req, res) => {
  res.send("모든 게시글 조회");
});

router.post("/", (req, res) => {
  res.status(201).send("게시글이 생성되었습니다");
});

module.exports = router;
