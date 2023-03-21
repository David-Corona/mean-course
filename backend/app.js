const express = require('express'); // express package installed

const app = express(); // execute the package as a function, and it will return an express app


app.use('/api/posts', (req, res, next) => {

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
