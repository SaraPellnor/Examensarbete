// ---- Import the OrderModel from the order.model module

const { OrderModel } = require("./order.model");



// --- Route handler to get orders based on user role (admin or regular user)

const getOrders = async (req, res, err) => {
  // HIDE WHEN AUTH WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // orders = await OrderModel.find()
  // res.status(200).json(orders); 

  let orders;
  try {
    // Check if the user is an admin
    req.session.user.is_admin
      ? (orders = await OrderModel.find()) 
      : (orders = await OrderModel.find({ user_ID: req.session.user.user_id }));
    // Check if orders were found
    !orders
      ? res.status(400).json("Finns inga ordrar")
      : res.status(200).json(orders); 
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Route handler to get a specific order by ID

const getOrderById = async (req, res, err) => {
  try {
    // Find the order by ID
    const order = await OrderModel.findById(req.params.id);

    // Check if the order was found
    !order
      ? res.status(200).json("Order not found")
      : res.status(200).json(order);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Route handler to create a new order

const createOrder = async (req, res, err) => {
  try {
    // Create a new order using the provided request body
    const order = await OrderModel.create(req.body);

    // Check if the order was created successfully
    !order
      ? res.status(200).json("Server error when creating a new order")
      : res.status(200).json(order);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Route handler to update an existing order

const changeOrder = async (req, res, err) => {
  try {
    // Find and update the order by ID with the provided request body
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated order
    });

    // Check if the order was found and updated
    !order
      ? res.status(400).json("Order not found")
      : res.status(200).json(order);
  } catch (error) {
    console.error("Error updating object:", err);
    res.status(500).json({ error: "Server error" });
  }
};



// ---- Route handler to delete an order by ID

const deleteOrder = async (req, res, err) => {
  try {
    // Find and delete the order by ID
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

    // Check if the order was found and deleted
    !deletedOrder
      ? res.status(400).json("Order not found") 
      : res.status(200).json(`${req.params.id} has been deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};



// --- Export the route handlers

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  changeOrder,
  deleteOrder,
};
