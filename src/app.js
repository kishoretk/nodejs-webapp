const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
var geocode = require("./utils/geocode");
var forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);

// partials configuration
hbs.registerPartials(partialsDirPath);

// set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App | NodeJS",
    name: "Kishore Thondam"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App | About",
    name: "Kishore Thondam"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App | Help",
    helpText: "All Queries answered here ...",
    name: "Kishore Thondam"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }

  geocode(req.query.address, (err, { latitude, longitude, location }) => {
    if (err === undefined) {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error === undefined) {
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          });

        } else {
            return res.send({ error: "Eror in ForeCast API. " + error });
        }
      });
    } else {
        return res.send({ error: "Eror in GeoCode API. " + error });
    }
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Weather App | Help",
    errorMessage: "Help article not found :(",
    name: "Kishore Thondam"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Weather App | 404",
    errorMessage:
      "You seem to have lost track. This page is no where in the site :(",
    name: "Kishore Thondam"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
