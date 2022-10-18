const mongoose = require("mongoose");

const ordersModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    OrderId: {
      type: String,
      default: "ORI" + parseInt(Math.random() * 1000) + 1000,
    },
    totalQuantity: Number,
    totalPrice: Number,
    storeLocation: String,
    city: String,
    Address: String,
    PhoneNo: Number,
    Shirts: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
    Tshirts: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
    Trousers: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
    Jeans: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
    Boxers: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
    Joggers: {
      name: String,
      washtype: String,
      quantity: Number,
      totalPrice: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", ordersModel);

module.exports = Order;
