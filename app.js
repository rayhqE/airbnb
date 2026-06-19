// Core Module
const path = require("path");
//External Module
const express = require("express");
//Local Module
const userRouter = require("./routes/userRouter.js");
const { hostRouter } = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is listening on address: http://localhost:${PORT}`);
});
