const express = require("express");
const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories.controller.js");

const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getSingleCategory);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);
router.put("/categories", updateCategory);

module.exports = router;
