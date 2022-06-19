module.exports.errorHandler = (err, res) => {
  if (err.name === "CastError") {
    err.message = "Пользователь или карточка не найдены";
    res.status(404).send(err);
  } else if (err.name === "ValidationError") {
    err.message = "Введены некорректные данные";
    res.status(400).send(err);
  } else {
    err.message = "Ошибка сервера";
    res.status(500).send(Error);
  }
};
