//Base modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const dbUri = require("./config_keys").mongoURI;

//Express element
const app = express();

//Middleware for post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport middleware initialisation
require("./passport/JWTStrat").jwt;
require("./passport/JWTStrat").google;
app.use(passport.initialize());

//Route files
const cities = require("./router/routeCities");
const itineraries = require("./router/routeitIneraries");
const activities = require("./router/routeActivities");
const users = require("./router/routeUser");
const chats = require("./router/routeChats");

//Router routes
app.use("/api/cities", cities);

app.use("/api/itineraries", itineraries);

app.use("/api/activities", activities);

app.use("/api/users", users);

app.use("/api/chats", chats);

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Server deploy
const port = process.env.PORT || 3030;

app.listen(port, () => console.log("Server runnning on port " + port));
