const path = require("path");
console.log(__dirname); // 현재 디렉토리를 알려주는 명령이다
console.log(__filename); // 현재 파일을 알려주는 명령이다 window = \ 로 파일 경로 나누나,,, 맥의 경우 /로 나눈다
console.log(path.sep); // 현재 디렉토리를 나누는 특수 문자 \
console.log(path.delimiter); // 한 문장이 끝날때 마다 ; 가 필요하다

console.log(path.basename(__filename)); // 파일 이름만 추출
console.log(path.basename(__filename, ".js")); // 확장자를 제외
console.log(path.dirname(__filename)); // 디렉토리만 추출
console.log(path.extname(__filename)); // 확장명만 추출
