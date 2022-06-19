const cardsRouter = require("express").Router();
const Card = require("./models/cards");

cardsRouter.get("/", (req, res) => {
  Card.find({}).then((cards) => res.send({ data: cards }));
});

cardsRouter.post("/", (req, res) => {
  const newCardEntry = req.body;
  newCardEntry.owner = req.user;

  Card.create(newCardEntry).then((card) => res.send({ data: card }));
});

cardsRouter.delete("/:cardId", (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) =>
    res.send({ data: card })
  );
});

module.exports = cardsRouter;
