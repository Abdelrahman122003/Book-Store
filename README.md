# Book Store

## Technologies Used

- MongoDB: Database system for storing data.
- Node.js: JavaScript runtime for executing server-side code.

- Express: Web application framework for Node.js used to build APIs.

- JWT: JSON Web Tokens for secure authentication between the client and the server.

## Installation

1. Clone the repository:
   `https://github.com/Abdelrahman-Sayed-CS/Book-Store-node.js.git`
2. Install dependencies:
   `npm install`

## Usage

- Development: Start the server in development mode with automatic js compilation:
  `npm run start`
- Production: Build the TypeScript code and start the server:
  `NODE_ENV=production nodemon server.js`

## APIS

## Authentication

- Login: `POST api/auth/login`
- SignUp: `POST api/auth/register`
- Update Customer Password: `PATCH api/auth/updateMyPassword`

## Customers

- Delete Customer Account: `DELETE api/customers/deleteMyAccount`
- Show All Customers: `GET api/customers/showCustomers`
- Get Customer By Username: `GET api/customers/getCustomerByUsername/:username`

## Book

- Add New Book: `POST api/books/addBook`
- Show All Books: `GET api/books/showBooks`
- Delete Book: `DELETE api/books/deleteBook/:ISBN`
- Edit Book: `PATCH api/books/editBook/:ISBN`
- Get Book: `GET api/books/getBookByISBN`

## Orders
