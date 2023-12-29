const { CategoryModel } = require("./categories.model");

const getCategories = async (req, res, err) => {
  try {
    const category = await CategoryModel.find();
    res.status(200).json(category);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createCategory = async (req, res, err) => {
    try {
        const category = await CategoryModel.create(req.body)
        res.status(201).json(category)
    } catch (error) {
      res.error(400).json(err);
    }
  };

module.exports = {getCategories, createCategory}