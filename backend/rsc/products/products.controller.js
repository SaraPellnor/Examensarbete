const { ProductModel } = require("./products.model");

const getProducts = async (req, res, err) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createProduct = async (req, res, err) => {
    try {
        const product = await ProductModel.create(req.body)
        res.status(201).json(product)
    } catch (error) {
      res.error(400).json(err);
    }
  };

module.exports = {getProducts, createProduct}