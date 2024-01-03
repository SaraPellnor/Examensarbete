// ---- Import the ProductModel from the specified file

const { ProductModel } = require("./products.model");



// ---- Retrieve all products

const getProducts = async (req, res, err) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Retrieve a specific product by ID

const getProductsById = async (req, res, err) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Create a new product

const createProduct = async (req, res, err) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Update an existing product

const changeProduct = async (req, res, err) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Delete a product by ID

const deleteProduct = async (req, res, err) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`${req.params.id} is deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Export the functions for use in other files

module.exports = { 
  getProducts, 
  getProductsById, 
  createProduct, 
  changeProduct, 
  deleteProduct };
