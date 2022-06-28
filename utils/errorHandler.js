const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  SERVER_ERROR,
} = require("./errorCodes");

module.exports.userErrorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST_STATUS)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST_STATUS).send({ message: "Передан невалидный id" });
  } else if (err.message === "noEntry") {
    res.status(NOT_FOUND_STATUS).send({ message: "Пользователь не найден" });
  } else {
    res.status(SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

module.exports.cardErrorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST_STATUS)
      .send({ message: "Переданы некорректные данные при создании карточки" });
  } else if (err.message === "noCard") {
    res.status(NOT_FOUND_STATUS).send({ message: "Карточка не найдена" });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST_STATUS).send({ message: "Передан невалидный id" });
  } else {
    res.status(SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};
