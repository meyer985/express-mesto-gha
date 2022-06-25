const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateAvatar,
  login,
} = require("../controllers/userControllers");

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/", addUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateAvatar);
userRouter.post("/test", login);
module.exports = userRouter;
