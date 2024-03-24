const express = require("express");
const {
  getAllBills,
  getSingleBill,
  createBill,
  deleteBill,
  updateBill,
} = require("../controllers/bills.controller");

const app = express.Router();

app.get("/bills", getAllBills);
app.get("/bills/:id", getSingleBill);
app.post("/bills", createBill);
app.delete("/bills/:id", deleteBill);
app.put("/bills/:id", updateBill);

module.exports = app;
