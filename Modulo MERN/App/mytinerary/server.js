//Base modules
const express = require("express");
const mongoose = require("mongoose");
//Express element
const app = express();
//Middleware for post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route files
const test = require("./router/routeTest");
const cities = require("./router/routeCities");
const itineraries = require("./router/routeitIneraries");
const activities = require("./router/routeActivities");
const users = require("./router/routeUser");

//Router routes
app.use("/api/test", test);

app.use("/api/cities", cities);

app.use("/api/itineraries", itineraries);

app.use("/api/activities", activities);

app.use("/api/users", users);

//DB conection (URI to be moved)
const mongoURI =
  "mongodb+srv://leonardo:leonardo@mytinerarycluster-x4qry.mongodb.net/mytinerary?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Server deploy
const port = process.env.PORT || 3030;

app.listen(port, () => console.log("Server runnning on port " + port));
