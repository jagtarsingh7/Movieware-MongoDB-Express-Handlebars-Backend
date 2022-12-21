/********************************************************************************* * 
 * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source * 
 * (including web sites) or distributed to other students. * 
 * * Group member Name: Jagtar Student IDs: N01476715 Date: 7/12/2020 
 * *********************************************************************************/


// load mongoose since we need it to define a model


var mongoose = require("mongoose");
var Schema = mongoose.Schema;
MvSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("User", MvSchema);
