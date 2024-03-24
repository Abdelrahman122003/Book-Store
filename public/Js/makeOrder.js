function getBooksOrder() {
  let booksOrder = [];
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let index = 0; index < cart.length; index++) {
    const element = JSON.parse(cart[index]);
    let book = {
      price: element.price,
      requiredQuantity: element.requiredQuantity,
      ISBN: element.ISBN,
    };
    booksOrder.push(book);
  }
  return booksOrder; // Return the processed order
}

// let books = getBooksOrder();
// for (let index = 0; index < books.length; index++) {
//   console.log(
//     books[index].ISBN,
//     "   ",
//     books[index].price,
//     "   ",
//     books[index].requiredQuantity
//   );
// }

// to make order (call api)
async function makeOrder() {
  let books = getBooksOrder();

  const response = await fetch("http://127.0.0.1:2003/api/orders/makeOrder", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // sent array of books
      books,
    }),
  }).catch((err) => {
    console.log("error ", err);
  });
}
