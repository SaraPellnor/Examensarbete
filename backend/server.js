//  ----Load environment variables from a .env file

// require("dotenv").config();

//  ---- Import cors for to allow orgin to fetch from frontend

const cors = require("cors");

// ---- Import necessary libraries

const express = require("express");
const session = require("express-session");
// const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");

// ---- Import route handlers

const { orderRoute } = require("./rsc/order/order.router");
const { productRoute } = require("./rsc/products/products.router");
const { userRoute } = require("./rsc/user/user.router");
const { categoryRoute } = require("./rsc/categories/categories.router");
const { stripeRoute } = require("./rsc/stripe/stripe.router");

// ---- Configure cors and session middleware

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  // cookieParser(),
  session({
    secret: process.env.SESSION_CONNECTION_KEY, // Secret key used to sign the session ID cookie
    resave: false, // Do not save the session if it hasn't changed
    saveUninitialized: true, // Save new sessions
    cookie: {
      maxAge: 3600000, // Session cookie will expire after 1 hour (in milliseconds)
      secure: false, //not https wile developing
      httpOnly: true, // only fetch, not for axios
      sameSite: "strict", // on the sam domen
    },
  })
);

// ---- Get connection url to mongoDB from environment variables

const mongoDBConnection = process.env.DB_CONNECTION_URL;

// ---- Parse incoming JSON requests

app.use(express.json());

// ---- Define routes for different resources

app.use("/app", userRoute);
app.use("/app", orderRoute);
app.use("/app", productRoute);
app.use("/app", categoryRoute);
app.use("/app", stripeRoute);

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
