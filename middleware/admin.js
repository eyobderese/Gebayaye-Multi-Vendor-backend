const jwt = require("jsonwebtoken");

function admin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, "jobman2008");
    if (decoded.role != "admin") {
      return res.status(401).send("Bad request");
    } else {
      next();
    }
  } catch (ex) {
    res.status(400).send("INVALID Token");
  }
}

module.exports = admin;
