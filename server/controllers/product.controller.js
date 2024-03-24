const Product = require("../models/Products.js");

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error!" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.body.productId,
    });

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.productId },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
