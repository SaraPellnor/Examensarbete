//  ----Load environment variables from a .env file

require("dotenv").config();



// ---- Import necessary libraries

const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");



// ---- Import route handlers

const { orderRoute } = require("./rsc/order/order.router");
const { productRoute } = require("./rsc/products/products.router");
const { userRoute } = require("./rsc/user/user.router");
const { categoryRoute } = require("./rsc/categories/categories.router");



// ---- Configure session middleware

app.use(
  session({
    secret: "catWithACow", // Secret key used to sign the session ID cookie
    resave: false, // Do not save the session if it hasn't changed
    saveUninitialized: true, // Save new sessions
    rolling: true, // Uppdate the maxAge when updat session
    secure: true, // Onley HTTPS
    httpOnly: true, // Onley HTTP
    sameSite: 'Strict', // samesite for secure
    cookie: {
      maxAge: 3600000, // Session cookie will expire after 1 hour (in milliseconds)
    },
  })
);



// ---- Get connection url to mongoDB from environment variables

const mongoDBConnection = process.env.DB_CONNECTION_URL



// ---- Parse incoming JSON requests

app.use(express.json());



// ---- Define routes for different resources

app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);



// ---- Connect to MongoDB using Mongoose

const init = async () => {
  await mongoose.connect(mongoDBConnection);

  // Start the server on port 3000
  app.listen(3000, () =>
    console.log("Server is up and running at http://localhost:3000")
  );
};



// ---- Call the initialization function

init();
