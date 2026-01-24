const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get("/", (req, res) => {
  res.send("Novatel API is running");
});

// Existing routes
const enquiryRoutes = require('./routes/enquiry.routes');
const testRoutes = require("./routes/test.routes");
const productRoutes = require("./routes/product.routes");

app.use('/api/enquiry', enquiryRoutes);
app.use("/api", testRoutes);
app.use("/api", productRoutes);

// AUTH ROUTES - ADD THIS
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;