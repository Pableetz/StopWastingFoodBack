const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).send({ error: "No token" });
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifie le token à l'aide de sa clé secrète en .env

    req.user = decoded; // rend disponible le payload du token dans les routes a req.user._id ou req.user.email etc...
    console.log(req.user);

    next(); // passe la main au controller si tout est ok
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = authMiddleware;
