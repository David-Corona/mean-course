const http = require('http'); // http package is intalled by default with node => Store package content in constant

// create server and store in constant
const server = http.createServer((req, res) => {
  res.end('This is my first response');
});

server.listen(process.env.PORT || 3000); // if not set, we will use 3000 (like for development).
