const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer sfdsfstoken
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    // can add a new field to request (carefull not to overwrite), rest of middlewares will get this new field
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch (error) { // if req.headers.authorization.split or jwt.verify fail
    res.status(401).json({
      message: "You are not authenticated!"
    });
  }
}
