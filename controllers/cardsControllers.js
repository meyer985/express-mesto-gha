const Card = require("../models/cards");
const { errorHandler } = require("./errorHandler");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      err.message = "Ошибка сервера";
      res.status(500).send(err);
    });
};

module.exports.postCard = (req, res) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.message = "Переданы некорректные данные при создании карточки";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(404).send({ message: "Карточка c указанным Id не найдена" });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        err.message = "Карточка не найдена";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
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
    }
  )
    .orFail(() => {
      res.status(404).send({ message: "Передан несуществующий _id карточки" });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        err.message = "Переданы некорректные данные карточки";
        res.status(400).send(err);
      } else {
        err.message = "Ошибка сервера";
        res.status(500).send(err);
      }
    });
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
    }
  )
    .orFail(() => {})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.send(err.message);

      // if (err.name === "CastError" || "DocumentNotFoundError") {
      //   err.message = "Переданы некорректные данные карточки";
      //   res.status(400).send(err);
      // } else if (err.message === "Not found") {
      //   res.status(404).send(err);
      // } else {
      //   err.message = "Ошибка сервера";
      //   res.status(500).send(err);
      // }
    });
};
