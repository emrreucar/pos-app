const Category = require("../models/Category.js");

const getAllCategories = async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const getSingleCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found!" });
    }

    res.status(200).json(category);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(200).json(newCategory);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.body.categoryId },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
