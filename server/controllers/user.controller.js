const User = require("../models/User.js");

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found!" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = { getAllUsers, getSingleUser };
