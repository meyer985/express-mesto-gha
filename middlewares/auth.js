const jwt = require("jsonwebtoken");
const {
  notFoundError,
  badRequestError,
  badAuthError,
  serverError,
} = require("../utils/errorHandler");

module.exports.auth = (req, res, next) => {
  const { authorisation } = req.headers;
  if (!authorisation || !authorisation.startsWith("Bearer")) {
    throw new badAuthError("Ошибка авторизации");
  }

  const token = authorisation.replace("Bearer", "");
  let payload;
  try {
    payload = jwt.verify(token, "mesto-key");
  } catch {
    throw new badAuthError("Ошибка авторизации");
  }

  req.user = payload;

  next();
};
