"use strict";

const app = require("../app");

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버가 가동되었습니다.`);
});
