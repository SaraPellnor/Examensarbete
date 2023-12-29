const { OrderModel } = require("./order.model");

const getOrders = async (req, res, err) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.error(400).json(err);
  }
};

const getOrderById = async (req, res, err) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    res.status(200).json(order);
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

  const changeOrder = async (req, res, err) => {
    try {
      const order = await OrderModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Fel vid uppdatering av objekt:', err);
      res.status(500).json({ error: 'Serverfel' });  }
  };
  
  const deleteOrder = async (req, res, err) => {
    try {
     await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`${req.params.id} is deleted`);
    } catch (error) {
      res.status(400).json(err);
    }
  };

module.exports = {getOrders, createOrder, getOrderById, changeOrder, deleteOrder }