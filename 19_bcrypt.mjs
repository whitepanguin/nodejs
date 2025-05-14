import bcrypt from "bcrypt";

const password = "apple1004";
const saltRounds = 10;

// 1. 비밀번호 해시화(저장할 때)
async function hassPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("해시된 비밀번호", hashed);
  return hashed;
}

// 2. 비밀번호 검증 (로그인할 때)
async function verifyPassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("비밀번호 일치 여부:", isMatch);
  return isMatch;
}

// 사용 예시
async function runExample() {
  const hashed = await hassPassword(password);

  await verifyPassword("apple1004", hashed);
  await verifyPassword("apple8756", hashed);
}

runExample();
