const Card = require("../models/cards");
const {
  notFoundError,
  badRequestError,
  badAuthError,
  serverError,
  forbiddenError,
} = require("../utils/errorHandler");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry)
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new notFoundError("Карточка не найдена");
      } else if (req.user._id !== card.owner.toString()) {
        throw new forbiddenError("Нет прав доступа");
      } else {
        Card.findByIdAndRemove(id)
          .then((card) => res.send({ data: card }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
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

module.exports.deleteLike = (req, res, next) => {
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
