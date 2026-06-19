const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home to airbnb" });
});

const registeredHouseNames = [];
hostRouter.post("/add-home", (req, res, next) => {
  // console.log(req.body.houseName);
  registeredHouseNames.push({ houseName: req.body.houseName });
  res.render("homeAdded.ejs", { pageTitle: "Home Added Successfully!" });
});

module.exports = { hostRouter, registeredHouseNames };
