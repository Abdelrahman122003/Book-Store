function returnAvailNumbers(id, data) {
  for (var i = 0; i < data.books.length; i++) {
    return data.books[i].ISBN === id ? data.books[i].amount : -1;
  }
}
function increase() {}

function decrease() {}

function CreateBook(data, Position, bookNumber) {
  // Create Html ELements
  let Container = document.createElement("div");
  let SubContainer = document.createElement("div");
  let BookImage = document.createElement("img");
  let BookName = document.createElement("h2");
  let TheBookName = document.createElement("span");
  let AuthorName = document.createElement("h2");
  let TheAuthorName = document.createElement("span");
  let Price = document.createElement("h2");
  let ThePrice = document.createElement("span");
  let Button1 = document.createElement("button");
  let Button2 = document.createElement("button");
  let OpenBook = document.createElement("a");

  // Set Elements Content
  BookImage.src = `../../Images/${data.cover}`;
  BookName.innerHTML = "Title : ";
  TheBookName.innerHTML = data.name;
  AuthorName.innerHTML = "Author: ";
  TheAuthorName.innerHTML = data.author;
  Price.innerHTML = "Price: ";
  ThePrice.innerHTML = data.price;
  Button1.innerHTML = "Add To Cart";
  let jsonString = JSON.stringify(data);
  Button1.setAttribute("book-object", jsonString);
  Button1.setAttribute("class", "addToCart");
  Button1.setAttribute("id", "bookNumber-" + bookNumber);
  //   OpenBook.href = "../Fixed/ShowBook.html";
  //   OpenBook.innerHTML = "More";
  //   OpenBook.setAttribute("bookData", data);

  // console.log(data);
  // Set SubELements
  BookName.appendChild(TheBookName);
  AuthorName.appendChild(TheAuthorName);
  Price.appendChild(ThePrice);
  //   Button2.appendChild(OpenBook);
  // Set Elements at The Main Container
  Container.appendChild(BookImage);
  SubContainer.appendChild(BookName);
  SubContainer.appendChild(AuthorName);
  SubContainer.appendChild(Price);
  SubContainer.appendChild(Button1);
  //   SubContainer.appendChild(Button2);
  Container.appendChild(SubContainer);

  // Append Container to the Body
  Position.appendChild(Container);
}
// localStorage.setItem("cart", JSON.stringify([]));

function addToCart(bookData) {
  // get cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart"));
  let check = true;
  let book = JSON.parse(bookData);
  // console.log(book);
  for (let i = 0; i < cart.length; i++) {
    let eachBook = JSON.parse(cart[i]);
    check = eachBook.ISBN === book.ISBN ? false : true;
  }
  if (check) cart.push(bookData);
  localStorage.setItem("cart", JSON.stringify(cart));
}
