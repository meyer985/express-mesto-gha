const router = require("express").Router();
const User = require("./models/users");

router.get("/:check", (req, res) => {
  console.log(req.params);
  res.send("working");
});

router.get("/", (req, res) => {
  User.find({}).then((users) => res.send({ data: users }));
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id).then((user) => res.send({ data: user }));
});

router.post("/", (req, res) => {
  User.create(req.body).then((user) => res.send({ data: user }));
});

module.exports = router;
