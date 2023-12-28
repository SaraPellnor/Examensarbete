const { UserModel } = require("./user.model");

const getUsers = async (req, res, err) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.error(400).json(err);
  }
};

const createUser = async (req, res, err) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json(user)
    } catch (error) {
      res.error(400).json(err);
    }
  };

module.exports = {getUsers, createUser}