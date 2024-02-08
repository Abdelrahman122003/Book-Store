const express = require("express");
const bookRouter = require("../backend/routes/bookRouter");
const app = express();
app.use("/api/books", bookRouter);
app.use(express.json);
module.exports = app;
