const express = require("express");
const mongoose = require("mongoose");
const router = require("./router.js");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
