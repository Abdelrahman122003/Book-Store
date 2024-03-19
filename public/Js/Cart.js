function MakeCart(data, position) {
  //   console.log(data);
  //   console.log(data.name, " ", data.amount);
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
  Amount.innerHTML = 1;
  ButtonCancel.innerHTML = "Cancel";

  BookName.appendChild(TheBookName);
  AuthorName.appendChild(TheAuthorName);
  Price.appendChild(ThePrice);

  BookImage.src = `../../Images/${data.cover}`;
  ButtonPlus.classList.add("fa-solid");
  ButtonPlus.classList.add("fa-plus");
  ButtonMinus.classList.add("fa-solid");
  ButtonMinus.classList.add("fa-minus");

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
