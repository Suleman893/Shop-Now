const express = require("express");
const connectDB = require("./config/database");
require("colors");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

connectDB();
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running at port", process.env.PORT);
});

// app.use(routes);

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

module.exports = app;
