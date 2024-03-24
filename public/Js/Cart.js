function MakeCart(data, position, index) {
  let Container = document.createElement("div");
  let SubContainer1 = document.createElement("div");
  let SubContainer2 = document.createElement("div");
  let SubContainer3 = document.createElement("div");
  let BookImage = document.createElement("img");
  let BookName = document.createElement("h2");
  let TheBookName = document.createElement("span");
  let AuthorName = document.createElement("h2");
  let TheAuthorName = document.createElement("span");
  let Price = document.createElement("h2");
  let ThePrice = document.createElement("span");
  let Amount = document.createElement("span");
  let ButtonPlus = document.createElement("i");
  let ButtonMinus = document.createElement("i");
  let ButtonCancel = document.createElement("button");

  BookName.innerHTML = "Title: ";
  AuthorName.innerHTML = "Author: ";
  Price.innerHTML = "Price: ";
  TheBookName.innerHTML = data.name;
  TheAuthorName.innerHTML = data.author;
  ThePrice.innerHTML = data.price;
  Amount.innerHTML = data.requiredQuantity;
  ButtonCancel.innerHTML = "Cancel";

  BookName.appendChild(TheBookName);
  AuthorName.appendChild(TheAuthorName);
  Price.appendChild(ThePrice);

  BookImage.src = `../../Images/${data.cover}`;
  ButtonPlus.classList.add("fa-solid");
  ButtonPlus.classList.add("fa-plus");
  ButtonPlus.classList.add("number-plus");
  ButtonMinus.classList.add("fa-solid");
  ButtonMinus.classList.add("fa-minus");
  ButtonMinus.classList.add("number-minus");
  Amount.setAttribute("data-number", index);
  Amount.setAttribute("id", `Num-${index}`);
  ButtonPlus.setAttribute("onclick", `increase(${index})`);
  ButtonMinus.setAttribute("onclick", `decrease(${index})`);
  ButtonCancel.setAttribute("onclick", `cancel(${index})`);
  Container.setAttribute("id", "bookNum-" + index);
  Amount.setAttribute("data-amount", data.ISBN);

  Container.appendChild(BookImage);
  SubContainer1.appendChild(BookName);
  SubContainer1.appendChild(AuthorName);
  SubContainer1.appendChild(Price);
  Container.appendChild(SubContainer1);
  SubContainer2.appendChild(Amount);
  SubContainer3.appendChild(ButtonPlus);
  SubContainer3.appendChild(ButtonMinus);
  SubContainer2.appendChild(SubContainer3);
  SubContainer2.appendChild(ButtonCancel);
  Container.appendChild(SubContainer2);
  position.appendChild(Container);
}

// get index for specific ISBN(serial number for Book)
function getIndex(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Handling null or undefined localStorage
  for (let i = 0; i < cart.length; i++) {
    let eachBook = JSON.parse(cart[i]);
    if (eachBook.ISBN == id) {
      return i;
    }
  }
  return -1;
}

// change Required Quantity In Cart that required in order
function changeRequiredQuantity(amount, index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let book = JSON.parse(cart[index]);
  // update requiredQuantity value in the cart
  book["requiredQuantity"] = amount;

  cart[index] = JSON.stringify(book);
  // then store it again
  localStorage.setItem("cart", JSON.stringify(cart));
}

function returnAvailNumbers(id) {
  let index = getIndex(id);
  if (index === -1) return 0;
  let cart = JSON.parse(localStorage.getItem("cart"));
  let book = JSON.parse(cart[index]);
  return book.amount;
}

function deleteBookFromCart(id) {
  let index = getIndex(id);
  if (index === -1) return -1;
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  console.log(cart);
  // then store updated cart
  localStorage.setItem("cart", JSON.stringify(cart));
}
// this function to increase quantity that customer want it from specific book
function increase(index) {
  let AmountSpan = document.getElementById(`Num-${index}`);
  // get ISBN for book which has this index
  let ISBN = parseInt(AmountSpan.getAttribute("data-amount"));

  // get quantity for book which has this ISBN
  let quantity = returnAvailNumbers(ISBN);
  console.log(quantity);
  if (parseInt(AmountSpan.innerHTML) < parseInt(quantity))
    AmountSpan.innerHTML++;
  else alert("Stock is not enough!");
  // to update quantity that customer required it
  changeRequiredQuantity(parseInt(AmountSpan.innerHTML), index);
}

// **this function to decrease quantity that customer want it from specific book
function decrease(index) {
  let AmountSpan = document.getElementById(`Num-${index}`);
  if (parseInt(AmountSpan.innerHTML) > 1) AmountSpan.innerHTML--;
  else alert("You can cancel book!");

  // to update quantity that customer required it
  changeRequiredQuantity(parseInt(AmountSpan.innerHTML), index);
}

function cancel(index) {
  let AmountSpan = document.getElementById(`Num-${index}`);

  // get ISBN for book which has this index
  let ISBN = parseInt(AmountSpan.getAttribute("data-amount"));

  // to delete book that has cancelled
  deleteBookFromCart(ISBN);

  // to prevent show it again
  document.getElementById(`bookNum-${index}`).style.display = "none";
}
