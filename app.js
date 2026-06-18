//External Module
const express = require("express");
//Local Module
const userRouter = require("./routes/userRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is listening on address: http://localhost:${PORT}`);
});
