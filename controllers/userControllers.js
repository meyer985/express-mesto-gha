const User = require("../models/users");
const { userErrorHandler } = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => userErrorHandler(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new Error("noEntry");
      }
      res.send({ data: user });
    })
    .catch((err) => userErrorHandler(err, res));
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 9)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => userErrorHandler(err, res));
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new Error("noEntry");
      }
      res.send({ data: user });
    })
    .catch((err) => userErrorHandler(err, res));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new Error("noEntry");
      }
      res.send({ data: user });
    })
    .catch((err) => userErrorHandler(err, res));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new Error("noEntry");
      }
      res.send({ data: user });
    })
    .catch((err) => userErrorHandler(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) =>
      bcrypt.compare(password, user.password).then((matching) => {
        if (!matching) {
          /*надо обработать ошибку*/
          throw new Error("misMatch");
        }
        const token = jwt.sign({ _id: user._id }, "mesto-key");
        res.send(token);
      })
    )
    .catch((err) => userErrorHandler(err, res));
};
