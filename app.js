const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routs/userRouter");
const cardsRouter = require("./routs/cardsRouter");
const { login, addUser } = require("./controllers/userControllers");
const { auth } = require("./middlewares/auth");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signin", login);
app.post("/signup", addUser);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

app.use((err, req, res, next) => {
  if (err.message === "badAuth") {
    res.status(401).send({ message: "Ошибка авторизации" });
  }
  next();
});

app.listen(PORT, () => console.log("App is working..."));
