const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./model/index");
const jwt = require("jsonwebtoken");
const session = require("express-session");

// 서버 require
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);

// 세션 설정
app.use(
  session({
    secret: "your-secret-key", // 세션을 암호화할 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true로 설정하면 https에서만 사용 가능
  })
);

dotenv.config();
const PORT = process.env.PORT;
const SECRETKEY = process.env.SECRETKEY || "fallback_secret_key";

// jwt 키발급 함수 -> Access, Refresh 두개 발급
function generate_Access_token(payload) {
  return jwt.sign(payload, SECRETKEY, { expiresIn: "15m" });
}
function generate_Refresh_token(payload) {
  return jwt.sign(payload, SECRETKEY, { expiresIn: "7d" });
}

// Controller에서 키발급하도록 exports화
module.exports = {
  generate_Access_token,
  generate_Refresh_token,
};

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("static"));
app.use(express.json());

// 소켓통신 컨트롤러 등록 -> io 바로 넣기
const socketController = require("./controller/Csocket")(io);

const indexRouter = require("./routes");
app.use("/", indexRouter);

// socket io에서 listen할 때는 http가 되어야함
db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("server open");
  });
});
