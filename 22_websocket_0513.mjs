/*
서버를 만들때 서버 소켓이라는 것을 만든다. 그럼 클라이언트(사용자)가 ip/port를 통해서 서버와 접속을 한다, 유저 또한 소켓(통신을 위한 것)이 만들어지고, 서버또한 소켓을 만들어 연결시켜준다.

    웹소켓
    웹소켓은 웹 브라우저와 서버 사이에 지속적으로 연결을 유지하면서 실시간으로 데이터를 주고받을 수 있는 통신 방식

예를 들어 가만히 있어도 상대방의 쳇이 올라오는 것
server.mjs만들고 html socket으로 서버 접속 서버는 악수로 소켓을 만들고 연결
*/
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import fs from "fs";
import { writeFile } from "fs/promises";

const app = express();
const server = createServer(app);
const io = new Server(server);
// ES(.mjs)에서는 __dirname, __filename이 없음
// import.meta.url: 현재 파일 경로
// fileURLToPath: 실제 경로를 문자열로 변환
// path.dirname: 디렉토리 이름만 추출
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

app.use(express.static(path.join(__dirname, "public")));

const users = {};

// function getLog(channel) {
//   const file = path.join(logsDir, `${channel}.json`);
//   return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
// }

// function logMessage(channel, message) {
//   const file = path.join(logsDir, `${channel}.json`);

//   const log = getLog(channel);
//   log.push(message);

//   // null: replacer 기록중에 뭘 바꾸고 싶은지, 글여쓰기 2칸
//   fs.writeFileSync(file, JSON.stringify(log, null, 2));

//   console.log(err);
// }

// 커넥션이 발생했다면~ socket을 생성
io.on("connection", (socket) => {
  socket.on("join", ({ nickname, channel }) => {
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    socket.join(channel);
    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    // to 서버의 이벤트
    io.to(channel).emit("message", msg);
    // console.log("nickname: ", nickname, ", channel: ", channel);
    // logMessage(channel, msg);

    const previousLog = getLog(channel);
    socket.emit("chatLog", previousLog);

    updateUserList();
  });

  socket.on("chat", ({ text, to }) => {
    // console.log(text);
    // console.log(to);
    const sender = users[socket.id];
    // console.log(sender);
    if (!sender) return;
    const payload = { user: sender.nickname, text };

    // 귓속말 처리해야 함
    if (to) {
      const reciverSocket = Object.entries(users).find(
        ([id, u]) => u.nickname === to
      )?.[0];
      //[0] 소켓id,, -(?.) 뭔가 ES7이후에 나온 문법이다. (옵셔널 체이닝): 값이 undefined일 경우 에러 없이 넘어가게 함(사용자가 없을 수도 있으니 안전하게 접근) 유저가 갑자기 나가거나 할때
      if (reciverSocket) {
        io.to(reciverSocket).emit("whisper", payload);
        // 나한테도 보여지게 하는 방법
        socket.emit("whisper", payload);
      }
    } else {
      io.to(sender.channel).emit("message", payload);
      // logMessage(sender.channel, payload);
    }
  });

  socket.on("changeChannel", ({ newChannel }) => {
    const oldChannel = socket.channel;
    const nickname = socket.nickname;
    socket.leave(oldChannel);
    io.to(oldChannel).emit("message", {
      user: "system",
      text: `${nickname}님이 ${newChannel} 채널로 이동했습니다`,
    });
    socket.channel = newChannel;
    console.log(users[socket.id].channel);
    users[socket.id].channel = newChannel;
    socket.join(newChannel);

    const joinMsg = { user: "system", text: `${nickname}님이 입장했습니다` };
    io.to(newChannel).emit("message", joinMsg);
    // logMessage(newChannel, joinMsg);

    const previousLog = getLog(newChannel);
    socket.emit("chatLog", previousLog);

    updateUserList();
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const msg = {
        user: "system",
        text: `${user.nickname}님이 퇴장했습니다`,
      };
      io.to(user.channel).emit("message", msg);
      // logMessage(user.channel, msg);
      delete users[socket.id];

      updateUserList();
    }
  });

  function updateUserList() {
    // 특정 배열에 요소만 꺼내서 다시 제저장을 한다
    const userList = Object.values(users); // [{nickname, channel},..]
    io.emit("userList", userList);
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
