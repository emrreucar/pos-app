const express = require("express");
const {
  getAllUsers,
  getSingleUser,
} = require("../controllers/user.controller");

const app = express.Router();

app.get("/users", getAllUsers);
app.get("/users/:id", getSingleUser);

module.exports = app;
