const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const games = require("./routes/api/games");
const hiScores = require("./routes/api/hiscores")

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// ALLOW CORS
const allowCrossDomain = function(req, res, next) {
  console.log("it's CORS, bitch")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);


// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes - swtich status to 200 if problematic
app.get("/ping", (reg, res) => res.sendStatus(200));
// app.post("/api/v1/hiscores", (req, res) => {
//   console.log("I'm hit")
//   res.json(req.body)
// })

app.use("/api/v1/users", users);
app.use("/api/v1/games", games);
app.use("/api/v1/hiscores", hiScores);


// app.use("*", (req, res) =>
//  res.sendStatus(404)
// );

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
