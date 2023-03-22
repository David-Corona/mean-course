const express = require('express'); // express package installed
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any domain to access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  ); // Incoming requests may have these headers, others will be blocked.
  res.setHeader(
    'Accese-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  ); // Only allows these methods, always add options
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title, // body is the new field added by body-parser
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find() // static method
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    });
});

// export the app (and import it from server.js)
module.exports = app; // will export the app and all the middlewares attached to it
