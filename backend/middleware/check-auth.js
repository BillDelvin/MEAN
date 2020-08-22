const jwt = require("jsonwebtoken");
const privateKey = "privateKey";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, privateKey);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Failed" });
  }
};
