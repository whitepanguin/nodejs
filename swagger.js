const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "게시판 API",
      version: "1.0.0",
      description: "게시글 관련 REST API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // 주석으로부터 API 문서 생성
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
