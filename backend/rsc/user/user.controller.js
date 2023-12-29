const { UserModel } = require("./user.model");

const getUsers = async (req, res, err) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.error(400).json(err);
  }
};

const logInUser = async (req, res, err) => {
  try {
    const user = await UserModel.findById(req.params.id);
    
    req.session.user = {
      isAdmin: user.isAdmin,
      username: user.username,
    };
    res.status(200).json(user);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    console.error("Fel vid skapande av användare:", error);
    res.status(500).json({ error: "Serverfel" });
  }
};

const changeUser = async (req, res, err) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Fel vid uppdatering av objekt:", err);
    res.status(500).json({ error: "Serverfel" });
  }
};

const deleteUser = async (req, res, err) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`${req.params.id} is deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};

module.exports = { getUsers, createUser, logInUser, changeUser, deleteUser };
