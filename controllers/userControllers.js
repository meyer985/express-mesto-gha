const User = require("../models/users");
const { errorHandler } = require("./errorHandler");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      err.message = "Ошибка сервера";
      res.status(500).send(err);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        err.message = "Пользователь не найден";
        res.status(404).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
};

module.exports.addUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.message = "Введены некорректные данные";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() =>
      res.status(404).send({ message: "Пользователь c указанным Id не найден" })
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.message = "Введены некорректные данные";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() =>
      res.status(404).send({ message: "Пользователь c указанным Id не найден" })
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.message = "Введены некорректные данные";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
};
