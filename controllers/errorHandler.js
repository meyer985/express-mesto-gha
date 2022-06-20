module.exports.userErrorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Пользователь не найден" });
  } else if (err.message === "noEntry") {
    res.status(404).send({ message: "Передан некорректный id пользователя" });
  } else {
    res.status(500).send({ message: "Ошибка сервера" });
  }
};

module.exports.cardErrorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные при создании карточки" });
  } else if (err.message === "noCard") {
    res.status(404).send({ message: "Передан несуществующий _id карточки" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Переданы некорректные данные карточки" });
  } else {
    res.status(500).send({ message: "Ошибка сервера" });
  }
};
