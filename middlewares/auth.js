const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const { authorisation } = req.headers;
  if (!authorisation || !authorisation.startsWith("Bearer")) {
    throw new Error("badAuth");
  }

  const token = authorisation.replace("Bearer", "");
  let payload;
  try {
    payload = jwt.verify(token, "mesto-key");
  } catch {
    throw new Error("badAuth");
  }

  req.user = payload;

  next();
};
