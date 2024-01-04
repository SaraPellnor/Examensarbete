// ---- Import the CategoryModel from the categories.model module

const { CategoryModel } = require("./categories.model");



// ---- Get all the categories from db

const getCategories = async (req, res, err) => {
  try {
    const category = await CategoryModel.find();
    !category
      ? res.status(200).json("category not found")
      : res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};



// ---- get a specific category from db

const getCategoryById = async (req, res, err) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    !category
      ? res.status(200).json("category not found")
      : res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};



// ---- creates a new category

const createCategory = async (req, res, err) => {
  try {
    const category = await CategoryModel.create(req.body);
    !category
      ? res.status(200).json("category not found")
      : res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};



// ---- make some changes on a specific category

const changeCategory = async (req, res, err) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    !category
      ? res.status(200).json("category not found")
      : res.status(200).json(category);
  } catch (error) {
    res.status(500).json("Fel vid uppdatering av objekt:", err);
  }
};



// ---- delete a specific category

const deleteCategory = async (req, res, err) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    !category
      ? res.status(200).json("category not found")
      : res.status(200).json(`${req.params.id} is deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- exports the functions

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  changeCategory,
  deleteCategory,
};
