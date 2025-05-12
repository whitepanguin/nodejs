const express = require("express");
const app = express();
const port = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const postRoutes = require("./routes/posts");

app.use(express.json());

// Swagger UI 라우트 등록
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 실제 API 라우트
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
  console.log(`Swagger 문서 보기: http://localhost:${port}/api-docs`);
});
