module.exports.errorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(400).send("Переданы некорректные данные");
  } else if (err.name === "CastError" || err.message === "noEntry") {
    res.status(404).send({ message: "Пользователь не найден" });
  } else {
    res.status(500).send({ message: "Ошибка сервера" });
  }
};
