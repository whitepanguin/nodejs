import {
  getUsers,
  createUser,
  updateUserEmail,
  deleteUser,
} from "./userRepository.mjs";
import { db } from "./db.mjs";
// db는 불러왔는데 안 썼다 왜지? createpool은 일단 안 끊는다.

async function main() {
  // select
  // const users = await getUsers();
  // console.log("사용자 목록: ", users);

  // insert
  //userid, userpw, name, hp, email, gender, ssn1, ssn2, zipcode, address1, address2, address3
  /*
    const newUserId = await createUser(
      "dun04045",
      "1234",
      "재용",
      "010-1111-1111",
      "dun04045@gmail.com",
      "남자",
      "000000",
      "0000000",
      "12345",
      "서울 서초구 양재동",
      "11-11",
      "6층"
    );
    console.log("새 사용자 ID: ", newUserId);
  */

  // update
  // const updateCount = await updateUserEmail(1, "apple@naver.com");
  // console.log("수정된 사용자 수: ", updateCount);

  // delete
  const deletedCount = await deleteUser(6);
  console.log("삭제된 사용자 수: ", deletedCount);

  await db.end(); // 이건 풀 종료 하지만 잘 쓰지는 않는다.
}

main();
