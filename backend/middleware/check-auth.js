const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer sfdsfstoken
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) { // if req.headers.authorization.split or jwt.verify fail
    res.status(401).json({
      message: "Auth failed!"
    });
  }
}
