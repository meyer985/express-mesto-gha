const Card = require("../models/cards");
const { cardErrorHandler } = require("../utils/errorHandler");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => cardErrorHandler(err, res));
};

module.exports.postCard = (req, res) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => cardErrorHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new Error("noCard");
      } else if (req.user._id !== card.owner.toString()) {
        throw new Error("badAuth");
      } else {
        Card.findByIdAndRemove(id)
          .then((card) => res.send({ data: card }))
          .catch((err) => cardErrorHandler(err, res));
      }
    })
    .catch((err) => cardErrorHandler(err, res));
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
        throw new Error("noCard");
      }
      res.send({ data: card });
    })
    .catch((err) => cardErrorHandler(err, res));
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
        throw new Error("noCard");
      }
      res.send({ data: card });
    })
    .catch((err) => cardErrorHandler(err, res));
};
