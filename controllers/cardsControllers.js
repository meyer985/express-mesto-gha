const Card = require("../models/cards");
const { errorHandler } = require("./errorHandler");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.postCard = (req, res) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry)
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};
