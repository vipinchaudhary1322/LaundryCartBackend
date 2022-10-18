const express = require("express");
const app = express();
const asyncHandler = require("express-async-handler");
const path =require('path')

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./Models/orderTypeModel");
const Order = require("./Models/ordersModel");
const User = require("./Models/userModel");
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")))


app.post(
  "/api/register",
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      state,
      address,
      pincode,
      district,
      phoneno,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !state ||
      !address ||
      !pincode ||
      !phoneno ||
      !district
    ) {
      res.status(400);
      throw new Error("Please Enter all Fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(200);
      throw new Error("User already Exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      state,
      address,
      pincode,
      district,
      phone: phoneno,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        // token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  })
);

app.post(
  "/api/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //console.log(email, password);
    const user = await User.findOne({ email });
    //console.log(user);

    if (user && (await user.matchPassword(password))) {
      res.json({
        name: user.name,
        email: user.email,
        password: user.password,
        userid: user._id,

        // token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid Email or Password");
    }
  })
);

app.get("/api/orders", async (req, res) => {
  const { id } = req.query;
  const orders = await Order.find({ userId: `${id}` });
  res.status(200).json(orders);
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

app.post("/api/products/createOrder", async (req, res) => {
  const {
    userId,
    totalQuantity,
    totalPrice,
    storeLocation,
    city,
    Address,
    PhoneNo,
    Shirts,
    Tshirts,
    Trousers,
    Jeans,
    Boxers,
    Joggers,
  } = req.body;

  const order = await Order.create({
    userId,
    totalQuantity,
    totalPrice,
    storeLocation,
    city,
    Address,
    PhoneNo,
    Shirts,
    Tshirts,
    Trousers,
    Jeans,
    Boxers,
    Joggers,
  });
  if (order) {
    res.status(201).json({
      success: true,
      message: "Order Is Successfully Placed ",
    });
  } else {
    res.status(400).send("Failed to Create the Order");
  }
});

// app.delete("/api/deleteOrder", async (req, res) => {
//   const { id } = req.body;
//   console.log(id);
//   const order = await Order.deleteOne({ OrderId: `${id}` });
//   if (order) {
//     res.status(200).json(order);
//   } else {
//     res.status(400).json({
//       message: "delete unsuccessfull",
//     });
//   }
// });
app.delete("/deleteOrder/:orderId", (req, res) => {
  // const deletedorder=orders.findById(req.params.orderId)
  // console.log(deletedorder,"hhh")
  Order.findByIdAndDelete(req.params.orderId, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        success: true,
        message: "order deleted",
      });
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`backend server started at port 5000}`);
});
