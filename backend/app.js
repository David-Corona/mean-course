const express = require('express'); // express package installed
const bodyParser = require("body-parser");

const app = express(); // execute the package as a function, and it will return an express app

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
  const post = req.body; // body is the new field added by body-parser
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

app.get('/api/posts', (req, res, next) => {

  const posts = [
    {
      id: '1',
      title: 'First Post',
      content: 'Content of first post from server'
    },
    {
      id: '2',
      title: 'Second server Post',
      content: 'Content of second post from server'
    },
  ];

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

// export the app (and import it from server.js)
module.exports = app; // will export the app and all the middlewares attached to it
