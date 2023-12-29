const { ProductModel } = require("./products.model");

const getProducts = async (req, res, err) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.error(400).json(err);
  }
};

const getProductsById = async (req, res, err) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createProduct = async (req, res, err) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.error(400).json(err);
  }
};

const changeProduct = async (req, res, err) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(product);
  } catch (error) {
    console.error('Fel vid uppdatering av objekt:', err);
    res.status(500).json({ error: 'Serverfel' });  }
};

const deleteProduct = async (req, res, err) => {
  try {
   await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`${req.params.id} is deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};

module.exports = { getProducts, getProductsById, createProduct, changeProduct, deleteProduct };
