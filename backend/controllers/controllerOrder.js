const Order = require("../models/order");
// make order
const addOrder = async (req, res, next) => {
  console.log("enter make order function");
  let totalPayment = 0.0;
  req.body.books.forEach((book) => {
    totalPayment += book.quantity * book.price;
  });
  console.log("totalPayment: ", totalPayment);

  try {
    let newOrder = await Order.create(req.body);
    newOrder.totalPayment = totalPayment;
    newOrder.status = "pending";
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// cancel order
const deleteOrder = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.orderId);
  res.status(204).json();
};

// show orders
const showOrders = async (req, res, next) => {
  const Orders = await Order.find();
  res.status(200).json(Orders);
};

module.exports = { addOrder, deleteOrder, showOrders };
