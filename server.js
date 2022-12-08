// Import express
const express = require("express");
// Import routes
const routes = require("./routes");
//loading env
require('dotenv').config()

// Initialize handlebars, mongoose, express app
const exphbs = require("express-handlebars");

var mongoose = require("mongoose");
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

var database = require("./database_config/database_atlas_movies");
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)

var port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

const HBS = exphbs.create({
  //configuring

  extname: "hbs", //setting ext name
  defaultLayout: "main", //setting default layout
  layoutsDir: path.join(__dirname, "views/layouts"), //setting path for layouts
  partialsDir: path.join(__dirname, "views/partials"), //setting path for partial layouts

  //create custom HELPER
  helpers: {
    check: (v1) => {
      if (v1 === ""){
        return "Not available";
      } else if (typeof v1 === "array") {
        a=[]
        v1.forEach(element => {
          a.push(element)
        }); 

      } else if (typeof v1 === "object") {
        a = [];

        for (var key in v1) {

           
            if (v1.hasOwnProperty(key)) {
              var val = v1[key];
            
              a.push(key+":"+val);
            }
        }
        console.log(a)
        return a;
      } else {
        return v1;
      }
    },
  },
});
app.engine(".hbs", HBS.engine);

//sets the template engine
app.set("view engine", "hbs");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(database.url);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Attach routes to app
app.use("/", routes);

// Set constant for port

// Listen on a port
//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
      console.log("listening for requests");
  })
})
