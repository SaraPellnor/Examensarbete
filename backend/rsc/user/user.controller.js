const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, err) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(err);
  }
};

const getUserById = async (req, res, err) => {
  try {
    const users = await UserModel.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(err);
  }
};

const auth = (req, res, err) => {

  try {
    console.log(req.session.user);
    const loggedInUser = req.session.user;
    console.log(loggedInUser);
    !loggedInUser && res.status(400).json("user is not logged in");

    res.status(200).json(req.session);
  } catch (error) {
    res.status(400).json(err);
  }
};

const logInUser = async (req, res, err) => {
  try {
    const { _id, password } = await UserModel.findOne({
      username: req.body.username,
    });

    !bcrypt.compare(req.body.password, password) &&
      res.status(400).json("fel lösenord");

    !password && res.status(400).json("user med det lösenordet finns inte");
    req.session.user = {user_id: _id.toString()};
    res.status(200).json(req.session);
  } catch (error) {
    res.status(400).json(err);
  }
};

const logOutUser = async (req, res, err) => {
  try {
    req.session.user = null;
    res.status(200).json(req.session);
  } catch (error) {
    res.status(400).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await UserModel.create(req.body);
    req.session.user = {
      user_id: newUser._id.toString(),
    };
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  logInUser,
  logOutUser,
  auth,
  changeUser,
  deleteUser,
};
