// Core Module
const path = require("path");
//External Module
const express = require("express");
//Local Module
const userRouter = require("./routes/userRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is listening on address: http://localhost:${PORT}`);
});
