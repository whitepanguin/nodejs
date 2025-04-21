//mjs 모듈 파일이라는 뜻
let count = 0;
export function increase() {
  count++;
}
export function getCount() {
  return count;
}
// 모듈은 모든 자바스크립트의 파일.getCount을 등록하겠다 어떤 기능? = 오른쪽 주소
