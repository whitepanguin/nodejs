import jwt from "jsonwebtoken";

const secretKey = "!@#$%^&*()!"; // 서버 비밀키

// 1.토큰 생성
const token = jwt.sign({ user: "apple", role: "admin" }, secretKey, {
  expiresIn: "1h",
});

console.log("생성된 토큰:", token);

// 2. 토큰 검증
try {
  const decoded = jwt.verify(token, secretKey);
  console.log("검증된 토큰 내용:", decoded);
} catch (err) {
  console.error("토큰 검증 실패:", err.message);
}
