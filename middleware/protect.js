const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // Get the token from the request headers or query parameters
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = bearer.split(" ")[1];
    // Verify the token
    jwt.verify(token, "verySecretValue", (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Add the decoded token payload to the request object
      req.user = decodedToken;

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticateUser,
};
