const { CategoryModel } = require("./categories.model");

// Get all the categories from db
const getCategories = async (req, res, err) => {
  try {
    const category = await CategoryModel.find();
    res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};

// get a specific category from db
const getCategoryById = async (req, res, err) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};

// creates a new category
const createCategory = async (req, res, err) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};

// make some changes on a specific category
const changeCategory = async (req, res, err) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(category);
  } catch (error) {
    console.error("Fel vid uppdatering av objekt:", err);
    res.status(500).json({ error: "Serverfel" });
  }
};

// delete a specific category
const deleteCategory = async (req, res, err) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`${req.params.id} is deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};

// exports the functions
module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  changeCategory,
  deleteCategory,
};