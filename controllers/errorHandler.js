module.exports.errorHandler = (err, res) => {
  if (err.name === "CastError") {
    res.status(404).send({ error: "Пользователь или карточка не найдены" });
  } else if (err.name === "ValidationError") {
    res.status(400).send({ error: "Введены некорректные данные" });
  } else {
    res.status(500).send({ error: "Ошибка сервера" });
  }
};
