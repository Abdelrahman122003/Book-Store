const Order = require("../models/order");
const Book = require("../models/book");
// make order
const addOrder = async (req, res, next) => {
  let totalPayment = 0.0;
  try {
    //Promise.all is used to wait for all the asynchronous operations inside the loop to complete before proceeding further.
    // This ensures that the totalPayment is correctly calculated before creating the order.
    await Promise.all(
      req.body.books.map(async (book) => {
        try {
          // Update the available quantity for the book
          const updatedBook = await Book.findOneAndUpdate(
            { ISBN: book.ISBN },
            { $inc: { amount: -book.requiredQuantity } }, // Decrease the quantity by the required amount
            { new: true }
          );
          totalPayment += book.requiredQuantity * updatedBook.price;
          console.log("in try total pay : ", totalPayment);
          console.log("Updated book:", updatedBook);
        } catch (error) {
          console.error("Error updating book quantity:", error);
          throw new Error("Error updating book quantity");
        }
      })
    );
    // Create a new order
    let newOrder = await Order.create({
      books: req.body.books,
      totalPayment: totalPayment,
      status: "pending",
      username: req.user.username,
    });

    await newOrder.save();
    // Handle success or further processing
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message || "Error creating order" });
  }
};

// cancel order
const cancelOrder = async (req, res, next) => {
  // 1)retrieve order first
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404).json({
      status: "failed",
      message: "You do not have an order with this ID!",
    });
  }

  // 2) Update the quantity of the book to reflect the quantity being returned in this order

  try {
    await Promise.all(
      order.books.map(async (book) => {
        try {
          // Update the available quantity for the book
          const updatedBook = await Book.findOneAndUpdate(
            { ISBN: book.ISBN },
            { $inc: { amount: +book.requiredQuantity } }, // Decrease the quantity by the required amount
            { new: true }
          );
        } catch (error) {
          console.error("Error updating book quantity:", error);
          throw new Error("Error updating book quantity");
        }
      })
    );
    // Handle success or further processing
    res.status(201).json({
      status: "success",
      message: "The order has been successfully deleted.",
    });
  } catch (error) {
    console.error("Error in deleting order:", error);
    res.status(500).json({ error: error.message || "Error in deleting order" });
  }

  //3)last step -> delete order from DB
  await Order.findByIdAndDelete(req.params.orderId);
};

// show orders
const showOrders = async (req, res, next) => {
  console.log("enter function");
  const Orders = await Order.findById(req.user.id).select("+books");
  res.status(200).json(Orders);
};

// show orders for a specific customer

const showOrdersForCustomer = async (req, res, next) => {
  const orders = await Order.find({ username: req.user.username });
  if (!orders.length) {
    res.status(404).json({
      message: "You have not placed any order before!",
    });
  }
  res.status(200).json(orders);
};

const getOrderById = async (req, res, next) => {
  //  There is a problem with this query if the customer writes an orderId that does not exist
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(404).json({
      message: "You do not have an order with this ID!",
    });
  }
  res.status(200).json(order);
};

module.exports = {
  getOrderById,
  addOrder,
  cancelOrder,
  showOrders,
  showOrdersForCustomer,
};

// **Bug in retrieving or deleting orders using an ID:
// If the ID has already been deleted, return an error message.
// Otherwise, the application crashes.
