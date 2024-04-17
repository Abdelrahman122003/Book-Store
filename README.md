# Book Store

## Technologies Used

- **MongoDB**: Database system for storing data.
- **Node.js**: JavaScript runtime for executing server-side code.

- **Express**: Web application framework for Node.js used to build APIs.

- **JWT**: JSON Web Tokens for secure authentication between the client and the server.

## Usage

- Development: Start the server in development mode with automatic js compilation:<br>
  `npm run start`
- Production: Build the TypeScript code and start the server:<br>
  `NODE_ENV=production nodemon server.js`

## APIS

### Authentication

- Login: `POST api/auth/login`
- SignUp: `POST api/auth/register`
- Update Customer Password: `PATCH api/auth/updateMyPassword`

### Customers

- Delete Customer Account: `DELETE api/customers/deleteMyAccount`
- Show All Customers: `GET api/customers/showCustomers`
- Get Customer By Username: `GET api/customers/getCustomerByUsername/:username`

### Book

- Add New Book: `POST api/books/addBook`
- Show All Books: `GET api/books/showBooks`
- Delete Book: `DELETE api/books/deleteBook/:ISBN`
- Edit Book: `PATCH api/books/editBook/:ISBN`
- Get Book: `GET api/books/getBookByISBN`

### Orders

- Make Order: `POST api/orders/makeOrder`
- Show Orders: `GET api/orders/showOrders`
- Cancel Order: `DELETE api/orders/cancelOrder/:orderId`
- Retrieve all customer orders: `GET api/orders/getAllOrdersForMe`
- Get Order By Id: `GET api/orders/getOrderById/:orderId`
