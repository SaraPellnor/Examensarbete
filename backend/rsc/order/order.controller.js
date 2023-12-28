const { OrderModel } = require("./order.model");

const getOrders = async (req, res, err) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createOrder = async (req, res, err) => {
    try {
        const order = await OrderModel.create(req.body)
        res.status(201).json(order)
    } catch (error) {
      res.error(400).json(err);
    }
  };

module.exports = {getOrders, createOrder}