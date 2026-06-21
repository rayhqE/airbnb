// Core Module
const path = require("path");
//External Module
const express = require("express");
//Local Module
const storeRouter = require("./routes/storeRouter.js");
const  hostRouter  = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");
const { get404 } = require("./controllers/errors.js");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(get404);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is listening on address: http://localhost:${PORT}`);
});
