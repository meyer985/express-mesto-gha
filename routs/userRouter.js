const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require("../controllers/userControllers");

userRouter.get("/", getUsers);
userRouter.get("/me", getUserInfo);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateAvatar);
userRouter.get("/:userId", getUser);

module.exports = userRouter;
