var request = require("request");

const forecast = (latitude, longitude, callback) => {
  var url =
    "https://api.darksky.net/forecast/0e09c725fdb89f8076855972429fffa6/" +
    latitude +
    "," +
    longitude +
    "/?units=ca";

  request({url, json: true }, (error, {body}) => {
    if (error) {
      callback("Exception occured. " + error, undefined);
    } else if (body.error) {
      callback("Unable to get forecast. Please try again! " + error, undefined);
    } else {
      callback(
        undefined, '. Todays forecast is ' + 
        body.daily.data[0].summary +
          ". Temperature will be around " +
          body.currently.temperature +
          " and chances of rain is " +
          body.currently.precipProbability
      );
    }
  });
};

module.exports = forecast;
