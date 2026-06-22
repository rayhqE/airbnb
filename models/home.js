const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const homeDataPath = path.join(rootDir, "data", "homes.json");
// let registeredHomes = [];
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        //edit home case
        registeredHomes = registeredHomes.map((home) =>
          home.id === this.id ? this : home,
        );
      } else {
        //add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.log("File writing concluded: ", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};
