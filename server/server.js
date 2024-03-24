const express = require("express");
const db = require("./utils/db.js");
const cors = require("cors");

const categoryRoute = require("./routes/categories.route.js");
const productRoute = require("./routes/product.route.js");
const billsRoute = require("./routes/bills.route.js");
const authRoute = require("./routes/auth.route.js");
const usersRoute = require("./routes/user.route.js");

const app = express();

//! middleware
app.use(express.json());
app.use(cors());

//! routes
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", billsRoute);
app.use("/api", authRoute);
app.use("/api", usersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  db();
  console.log(`App listening on port ${PORT}...`);
});
