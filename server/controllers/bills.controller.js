const Bills = require("../models/Bill.js");

const getAllBills = async (_, res) => {
  try {
    const bills = await Bills.find();
    return res.status(200).json(bills);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const getSingleBill = async (req, res) => {
  const id = req.params.id;

  try {
    const bill = await Bills.findById(id);
    return res.status(200).json(bill);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const createBill = async (req, res) => {
  try {
    const newBill = new Bills(req.body);
    await newBill.save();

    return res.status(200).json(newBill);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const deleteBill = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBill = await Bills.findByIdAndDelete(id);
    return res.status(200).json(deletedBill);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const updateBill = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedBill = await Bills.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedBill);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllBills,
  getSingleBill,
  createBill,
  deleteBill,
  updateBill,
};
