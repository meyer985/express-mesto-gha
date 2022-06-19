const router = require("express").Router();
const User = require("./models/users");

router.get("/", (req, res) => {
  User.find({}).then((users) => res.send({ data: users }));
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId).then((user) => res.send({ data: user }));
});

router.post("/", (req, res) => {
  User.create(req.body).then((user) => res.send({ data: user }));
});

module.exports = router;
