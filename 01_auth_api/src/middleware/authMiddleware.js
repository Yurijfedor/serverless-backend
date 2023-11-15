const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Необхідно авторизуватися" });
  }

  const [bearer, accessToken] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Невалідний формат токену доступу" });
  }

  jwt.verify(accessToken, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Невалідний токен доступу" });
    }

    req.user = { userId: decoded.userId, userUuid: decoded.userUuid };
    next();
  });
};

module.exports = authenticateUser;
