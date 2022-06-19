const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateAvatar,
} = require("../controllers/userControllers");

// function errorHandler(res, err) {
//   if (err.name === "ValidationError") {
//     res.status(400).send("Отправлены некорректные данные");
//   } else {
//     res.status(500).send("Произошла ошибка", err.message);
//   }
// }

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/", addUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateAvatar);

module.exports = userRouter;
