const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).json("Not authenticated.");
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    res.status(500).json("Not Allowed");
  }
  if (!decodedToken) {
    res.status(401).json("Not authenticated.");
  }
  req.userId = decodedToken.userId;
  next();
};
