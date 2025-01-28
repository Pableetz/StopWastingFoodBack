const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());

const PORT = 8080;

dotenv.config();

app.use(cors({ origin: "*" }));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/stopwastingfood", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use("/users", require("./Routes/userRoutes"));
app.use("/products", require("./Routes/productRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
