const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// --- UPDATED CORS LOGIC ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://novatel.vercel.app',
  'https://www.novatel.vercel.app' // Optional: if you use www
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
// --------------------------

app.use(express.json());
app.use(cookieParser());

// ... rest of your code stays the same

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