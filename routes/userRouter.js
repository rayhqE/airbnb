const path = require("path");
const express = require("express");
const userRouter = express.Router();

// const rootDir = require("../utils/pathUtil");
const { registeredHouseNames } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHouseNames);
  res.render("home", {
    registeredHouseNames: registeredHouseNames,
    pageTitle: "airbnb Home",
  });
});

module.exports = userRouter;
