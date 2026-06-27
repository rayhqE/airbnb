// Core Module
const path = require("path");
//External Module
const express = require("express");
//Local Module
const storeRouter = require("./routes/storeRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");
const { get404 } = require("./controllers/errors.js");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(get404);

const PORT = 3003;
const DB_PATH =
  "mongodb://root:Rust1234@ac-85mr5f1-shard-00-00.qikfhs5.mongodb.net:27017,ac-85mr5f1-shard-00-01.qikfhs5.mongodb.net:27017,ac-85mr5f1-shard-00-02.qikfhs5.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-lnwgrs-shard-0&authSource=admin&appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on address: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
