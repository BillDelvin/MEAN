const jwt = require("jsonwebtoken");
const privateKey = "privateKey";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, privateKey);
    // in here create new req that is userData
    req.userData = { email: decodeToken.email, userId: decodeToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Failed" });
  }
};
