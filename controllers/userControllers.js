const User = require("../models/users");
const { userErrorHandler } = require("./errorHandler");

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
  User.create(req.body)
    .then((user) => res.send({ data: user }))
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
