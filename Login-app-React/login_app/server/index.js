const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());
//mongoose.connect("mongodb://127.0.0.1:27017/user");
mongoose.connect('mongodb://host.docker.internal:27017/user')

let current_user = null;

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
        current_user = user;
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  // Update the request body to include the initial account balance
  const { name, email, password } = req.body;
  const newUser = { name, email, password, accountBalance: 100000 };

  UserModel.create(newUser)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/user-info", (req, res) => {
  if (current_user) {
    res.json(current_user);
  } else {
    res.json("No user is logged in");
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
