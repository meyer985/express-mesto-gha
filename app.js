const express = require("express");
const mongoose = require("mongoose");
const router = require("./router.js");
const cardsRouter = require("./cardsRouter.js");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "62ae2ae0ea08d7b3df73c341",
  };

  next();
});

app.use("/users", router);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
