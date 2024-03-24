const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
