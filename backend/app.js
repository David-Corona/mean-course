const path = require('path');
const express = require('express'); // express package installed
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express(); // execute the package as a function, and it will return an express app

mongoose.connect("mongodb+srv://david:tWMNHqIbqTYJX4eT@cluster0.r9ofouf.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false})); // another example
app.use("/images", express.static(path.join("backend/images"))); // any request targeting /images will be allowed to continue

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any domain to access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Incoming requests may have these headers, others will be blocked.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // Only allows these methods, always add options
  next();
});

app.use("/api/posts", postsRoutes);

// export the app (and import it from server.js)
module.exports = app; // will export the app and all the middlewares attached to it
