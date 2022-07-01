const User = require("../models/users");
const {
  notFoundError,
  badRequestError,
  badAuthError,
  serverError,
} = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new notFoundError("Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 9)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch(next);
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new notFoundError("Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new notFoundError("Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new notFoundError("Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      bcrypt.compare(password, user.password).then((matching) => {
        if (!matching) {
          next(new badAuthError("Неправильный логин или пароль"));
        }
        const token = jwt.sign({ _id: user._id }, "mesto-key");
        res.send(token);
      });
    })

    .catch(next);
};
