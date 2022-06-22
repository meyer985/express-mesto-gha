module.exports.userErrorHandler = (err, res) => {
  if (err.name === 'ValidationError') {
    res
      .status(400)
      .send({ message: 'Переданы некорректные данные пользователя' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Передан невалидный id' });
  } else if (err.message === 'noEntry') {
    res.status(404).send({ message: 'Пользователь не найден' });
  } else {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
};

module.exports.cardErrorHandler = (err, res) => {
  if (err.name === 'ValidationError') {
    res
      .status(400)
      .send({ message: 'Переданы некорректные данные при создании карточки' });
  } else if (err.message === 'noCard') {
    res.status(404).send({ message: 'Карточка не найдена' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Передан невалидный id' });
  } else {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
};
