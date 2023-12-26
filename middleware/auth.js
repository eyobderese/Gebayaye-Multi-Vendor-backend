const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, "jobman2008");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("INVALID Token");
  }
}

module.exports = auth;
