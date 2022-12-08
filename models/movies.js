// load mongoose since we need it to define a model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const awardsObj = mongoose.Schema({
  wins: Number,
  nomination: Number,
  text: String,
});

const imbdObj = mongoose.Schema({
  rating: Number,
  votes: Number,
  id: Number,
});

const viewerObj = mongoose.Schema({
  rating: Number,
  numReviews: Number,
  meter: Number,
});

const tomatoesObj = mongoose.Schema({
  viewer: viewerObj,
  critic:viewerObj,
  rotten:Number,
  lastUpdated: Date,
});

MvSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  countries: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: awardsObj,
  lastupdated: Date,
  year: Number,
  imdb: imbdObj,
  type: String,
  tomatoes: tomatoesObj
});
module.exports = mongoose.model("Movie", MvSchema);
