const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      res.redirect("/host/host-home-list");
    } else {
      // console.log(homeId, editing, home);
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit your home",
        currentPage: "host-homes",
        editing: editing,
      });
    }
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  // console.log("Home Registration successful for:", req.body);
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home
    .save()
    .then(() => {
      console.log("Home Saved Successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error Adding Home: ", error);
    });
};

exports.postEditHome = (req, res, next) => {
  // console.log("Home Registration successful for:", req.body);
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      home
        .save()
        .then((result) => {
          console.log("Home Updated ", result);
        })
        .catch((err) => {
          console.log("Error while updating ", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while finding Home ", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete  ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while deleting: ", err);
    });
};
