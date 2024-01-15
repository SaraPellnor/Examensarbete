const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");



// ---- Get all users from the database

const getUsers = async (req, res, err) => {
  try {
    const users = await UserModel.find();
    users.length < 1
      ? res.status(400).json("No users found")
      : res.status(200).json(users);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Get a user based on user ID from the database

const getUserById = async (req, res, err) => {
  try {
    const user = await UserModel.findById(req.params.id);
    !user ? res.status(200).json("User not found") : res.status(200).json(user);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Check authentication based on user session

const isUserLoggedIn = (req, res, err) => {
  try {
      const loggedInUser = req.session.user;
console.log(req.session);

    !loggedInUser
      ? res.status(200).json("User is not logged in")
      : res.status(200).json(loggedInUser);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Log in user and create a session variable

const logInUser = async (req, res, err) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });
    !user
      ? res.status(400).json("Incorrect username")
      : bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (err) {
              res.status(500).json("Server error");
            } else {
              if (!result) {
                res.status(400).json("Incorrect password");
              } else {
                req.session.user = {
                  is_admin: user.isAdmin,
                  user_id: user._id.toString(),
                  username: user.username,
                };
                res.status(200).json(req.session.user);
              }
            }
          }
        );
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Log out user by resetting the session variable

const logOutUser = async (req, res, err) => {
  try {
    !req.session.user
      ? res.status(400).json("user is not logged in")
      : 
        (req.session.user = null);

    res.status(200).json("User is logged out");
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Create a new user and hash the password before storing it in the database

const createUser = async (req, res) => {
  try {
    const user = req.body;

    // Hash the password before storing it in the database
    user.password = await bcrypt.hash(user.password, 10);

    // Create a new user in the database
    const newUser = await UserModel.create(req.body);
    !newUser
      ? res.status(400).json("Unable to create the user")
      : // Create a session variable with user ID
        (req.session.user = {
          is_admin: user.isAdmin,
          user_id: newUser._id.toString(),
          username: user.username,
        });

    res.status(201).json(user);
  } catch (error) {
    // Handel validation error 
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      console.log(error);
      return res.status(400).json({ error: errors });
    }
    res.status(400).json(`errorMessage: ${error}`);
  }
};



// ---- Update user information based on user ID

const changeUser = async (req, res, err) => {
  try {
    // Update the user in the database and return the updated user
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    !user
      ? res.status(400).json("User not found")
      : 
        res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



// ---- Delete user based on user ID

const deleteUser = async (req, res, err) => {
  try {
    // Delete the user from the database and return a confirmation message
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    !deletedUser
      ? res.status(400).json("User not found")
      : res.status(200).json(`${req.params.id} has been deleted`);
  } catch (error) {
    res.status(400).json(err);
  }
};



// ---- Export all user controller functions

module.exports = {
  getUsers,
  getUserById,
  createUser,
  logInUser,
  logOutUser,
  isUserLoggedIn,
  changeUser,
  deleteUser,
};
