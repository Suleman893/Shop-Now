const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.json({extended: false}));
connectDB();

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running at port", process.env.PORT);
});

// app.use(routes);

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

module.exports = app;
