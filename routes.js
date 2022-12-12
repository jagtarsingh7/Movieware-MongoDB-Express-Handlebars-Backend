const express = require("express");
const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Create router
const router = express.Router();
var Movie = require("./models/movies");
var User = require("./models/users");

// Chained router route for Root Route
router.route("/").get(function (req, res) {
  res.render("login");
});

router
  .get("/login",function (req, res) {
    res.render("login");
  })
  .post("/loginjwt",
    (req, res, next) => {
      check(req.body.email).isEmail().run(req);
      check(req.body.password).isLength({ min: 6 }).run(req);
      console.log(req.body.password)

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      next();
    },
    (req, res) => {
      // Handle the request somehow
      let email = req.body.email;
      let password = req.body.password;

      User.find({ email: email })
        .lean()
        .exec(async function (err, user) {
          // if there is an error retrieving, send the error otherwise send data
          if (err) res.send(err);
          try {
            console.log(user[0].password);

            if (await bcrypt.compare(password, user[0].password)) {
              let payload = {
                name: user[0].name,
              };
              let token = jwt.sign(payload, process.env.PRIVATE_KEY);
              res.render("loginjwt", { data: token });

            } else {
              res.render("error");
            }
          } catch {
            res.status(500).send();
          }
        });
    }
  );

// Chained router route for Root Route
router
  .route("/register")
  .get(function (req, res) {
    res.render("register");
  })
  .post(
    (req, res, next) => {
      console.log(req.body.name);
      console.log(req.body.password);
      check("email").isEmail().run(req);
      check("password").isLength({ min: 6 }).run(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      next();
    },
    async (req, res) => {
      // Handle the request 

      let salt = await bcrypt.genSalt();
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
        function (err, movie) {
          if (err) res.send(err);
          // get and return all the movies after newly created employe record
          User.find({ name: req.body.name })
            .lean()
            .exec(function (err, users) {
              // if there is an error retrieving, send the error otherwise send data
              if (err) res.send(err);

              res.send("Sucessfully created ! Now go back to login")
            });
        }
      );
    }
  );

//get all Movie data from db     /////movies
router.route("/movies/all/").get(function (req, res) {
  // use mongoose to get all todos in the database
  let number = req.query.page;
  Movie.find()
    .limit(20)
    .skip(number * 20)
    .lean()
    .exec(function (err, movies) {
      // if there is an error retrieving, send the error otherwise send data
      if (err) res.send(err);
      res.render("movies", { data: movies });
      console.log(movies); // return all movies
    });
});

// get a Movie with title.   /////// searchbytitle---------------forumSingle and movies
router
  .route("/movies/search/")
  .get(function (req, res) {
    res.render("searchByTitle"); // return all books in JSON format
  })
  .post( function (req, res) {
    let title = req.body.title;
    Movie.find({ title: { $regex: title } })
      .lean()
      .exec(function (err, movies) {
        // if there is an error retrieving, send the error otherwise send data
        if (err) res.send(err);
        //res.send(movies);
        res.render("movies", { data: movies });
        console.log(movies); // return all movies
      });
  });

//add a movie                     //////////addMovie ---------forum      movies
router
  .route("/movies/add/")
  .get(function (req, res) {
    res.render("addMovie");
  })
  // create Movie and send back all movies after creation
  .post(authenticateToken, function (req, res) {
    // create mongose method to create a new record into collection
    console.log(req.body);

    Movie.create(
      {
        plot: req.body.plot,
        genres: req.body.genres,
        runtime: req.body.runtime,
        cast: req.body.cast,
        num_mflix_comments: req.body.comments,
        title: req.body.title,
        fullplot: req.body.fullplot,
      },
      function (err, movie) {
        if (err) res.send(err);

        // get and return all the movies after newly created employe record

        Movie.find({ title: req.body.title })
          .lean()
          .exec(function (err, movies) {
            // if there is an error retrieving, send the error otherwise send data
            if (err) res.send(err);
            //res.send(movies);
            res.render("movies", { data: movies });
            console.log(movies); // return all movies
          });
      }
    );
  });

// Modify a movie                              //////////updateMovie------forum      movies
router
  .get("/movies/update/", function (req, res) {
    res.render("updateByID");
  })
  .put("/movies/update/:id", authenticateToken, function (req, res) {
    // create mongose method to update an existing record into collection

    let id = req.params.id;
    console.log(id);
    var data = {
      title: req.body.title,
    };
    console.log(data);

    // save the user
    Movie.findByIdAndUpdate(id, data, function (err, m) {
      console.log("sdsds");
      if (err) {
        throw err;
      } else {
        res.send("Successfully! Movie updated - ");
      }
    });
  });

// delete a Movie by id                          //////////deleteMovie---forumSingle      movies
router
  .get("/movies/delete", function (req, res) {
    res.render("deleteByID");
  })
  .delete("/movies/delete/:id", authenticateToken, function (req, res) {
    let id = req.params.id;
    console.log(id);
    Movie.remove(
      {
        _id: id,
      },
      function (err) {
        if (err) res.send(err);
        else res.send("Successfully! Movie has been Deleted.");
      }
    );
  });

router.all("*", (req, res) => {
  res.status(404).send("Error 404: pagenot found");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("req.user " + user);
    req.user = user;
    next();
  });
}

// Export router
module.exports = router;
