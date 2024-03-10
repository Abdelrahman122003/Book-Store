const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
};
app.use(cors(corsOptions));
const DB =
  "mongodb+srv://mostafa3132004:DuXaxkJrP8RGuXR2@cluster0.tyo186d.mongodb.net/novelnest";
const port = 2003;

// Middleware to set the Cross-Origin-Resource-Policy header
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
//   next();
// });

// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
//   next();
// });

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "home.html"));
// });
