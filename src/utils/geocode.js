var request = require("request");

const geocode = (address, callback) => {
  var geoCodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?limit=2&access_token=pk.eyJ1Ijoia2lzaG9yZXRrIiwiYSI6ImNrM2ZqYTU2NDA1am0zbnBoM28zZDQyaXEifQ.wleYKq-ojQF1vyvBJwMXiw";

  request({ url: geoCodeUrl, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services. ", undefined);
    } else if (body.features.length == 0) {
        callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
      })
    }
  });
};

module.exports = geocode;
