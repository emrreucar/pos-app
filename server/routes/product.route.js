const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller.js");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products", createProduct);
router.delete("/products", deleteProduct);
router.put("/products", updateProduct);

module.exports = router;
