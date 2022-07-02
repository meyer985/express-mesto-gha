const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routs/userRouter");
const cardsRouter = require("./routs/cardsRouter");
const { login, addUser } = require("./controllers/userControllers");
const { auth } = require("./middlewares/auth");
const { celebrate, Joi, errors } = require("celebrate");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*LOGIN*/
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

/*ADD USER*/
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  addUser
);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err.code);
  if (err.name === "ValidationError") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.code === 11000) {
    res.status(409).send({ message: "Указанный email уже зарегистрирован" });
  } else {
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({ message: statusCode === 500 ? "Ошибка сервера" : message });
  }
});

app.listen(PORT, () => console.log("App is working..."));
