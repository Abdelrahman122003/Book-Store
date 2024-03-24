const Order = require("../models/order");
const Book = require("../models/book");
// make order
const addOrder = async (req, res, next) => {
  // console.log("enter make order function");
  let totalPayment = 0.0;
  req.body.books.forEach(async (book) => {
    totalPayment += book.requiredQuantity * book.price;
    try {
      // Update the available quantity for the book
      const updatedBook = await Book.findOneAndUpdate(
        { ISBN: book.ISBN },
        { $inc: { amount: -book.requiredQuantity } }, // Decrease the quantity by the required amount
        { new: true }
      );
      console.log("Updated book:", updatedBook);
    } catch (error) {
      console.error("Error updating book quantity:", error);
      return res.status(500).json({ error: "Error updating book quantity" });
    }
  });
  try {
    // Create a new order
    let newOrder = await Order.create({
      books: req.body,
      totalPayment: totalPayment,
      status: "pending",
      username: req.user.username,
    });

    console.log(newOrder);
    await newOrder.save();
    // Handle success or further processing
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

// show orders for a specific customer

const showOrdersForCustomer = async (req, res, next) => {
  const orders = await Order.find({ username: req.user.username });
  if (!orders.length) {
    res.status(404).json({
      message: "You have not placed any orders before!",
    });
  }
  res.status(200).json(orders);
};

module.exports = { addOrder, deleteOrder, showOrders, showOrdersForCustomer };
