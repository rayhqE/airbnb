const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      // console.log(favourites, registeredHomes);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString()),
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  // console.log("Came to add to Favourites", req.body);
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("Fav added: ", result);
    })
    .catch((error) => {
      console.log("Error while marking fav: ", error);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((error) => {
      console.log("Error while Removing fav: ", error);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not Found!");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
