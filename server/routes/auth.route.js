const express = require("express");
const { createUser, login } = require("../controllers/auth.controller");

const app = express.Router();

app.post("/auth/register", createUser);
app.post("/auth/login", login);

module.exports = app;
