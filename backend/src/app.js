const express = require("express");
const cors = require("cors");



const app = express(); // ✅ app CREATED FIRST

// Middleware
app.use(cors());
app.use(express.json());



// ✅ Public health route (MUST be after app creation)
app.get("/", (req, res) => {
  res.send("Novatel API is running");
});
const testRoutes = require("./routes/test.routes");
app.use("/api", testRoutes);
const productRoutes = require("./routes/product.routes");
app.use("/api", productRoutes);
module.exports = app;

