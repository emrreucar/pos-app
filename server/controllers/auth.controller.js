const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(403).json({ error: "Invalid password" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = { createUser, login };
