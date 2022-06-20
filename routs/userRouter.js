const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateAvatar,
} = require('../controllers/userControllers');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', addUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
