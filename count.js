let count = 0;
function increase() {
  count++;
}
function getCount() {
  return count;
}
// 모듈은 모든 자바스크립트의 파일.getCount을 등록하겠다 어떤 기능? = 오른쪽 주소
module.exports.getCount = getCount;
module.exports.increase = increase;
