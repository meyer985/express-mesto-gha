const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const {
  notFoundError,
  badRequestError,
  badAuthError,
  serverError,
} = require('../utils/errorHandler');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new notFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 9)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new notFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new notFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new notFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new badAuthError('Неправильный логин или пароль');
      }
      bcrypt
        .compare(password, user.password)
        .then((matching) => {
          if (!matching) {
            throw new badAuthError('Неправильный логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'mesto-key');
          res
            .status(200)
            .cookie('jwt', token, {
              httpOnly: true,
            })
            .send({ jwt: token });
        })
        .catch(next);
    })

    .catch(next);
};
