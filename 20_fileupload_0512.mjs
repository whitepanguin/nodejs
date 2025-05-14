import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;
// null :  error처리
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });
//파일 한개 받기 file1은 클라이언트(프론트)의 name값이랑 동일하게 넣줘야한다
app.post("/upload-single", upload.single("file1"), (req, res) => {
  console.log(req.file);
  res.json({
    message: "단일파일 업로드 성공",
    file: req.file,
  });
});

app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  console.log(req.files);
  res.json({
    message: "다중 파일 업로드 성공",
    files: req.files,
  });
});

app.listen(port, () => {
  console.log(`${port}번호로 서버 실행 중`);
});
