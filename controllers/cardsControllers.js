const Card = require("../models/cards");
const {
  notFoundError,
  badRequestError,
  badAuthError,
  serverError,
} = require("../utils/errorHandler");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.postCard = (req, res) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry)
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new notFoundError("Карточка не найдена");
      } else if (req.user._id !== card.owner.toString()) {
        throw new badAuthError("Ошибка авторизации");
      } else {
        Card.findByIdAndRemove(id)
          .then((card) => res.send({ data: card }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((card) => {
      if (!card) {
        throw new notFoundError("Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((card) => {
      if (!card) {
        throw new notFoundError("Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch(next);
};
