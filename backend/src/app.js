const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://novatel.vercel.app',
  'https://www.novatel.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.send("Novatel API is running");
});

// Route imports
const enquiryRoutes = require('./routes/enquiry.routes');
const productRoutes = require("./routes/product.routes");
const authRoutes = require('./routes/authRoutes');

// API Routes
app.use('/api/enquiries', enquiryRoutes); // Dashboard /api/enquiry/all hit karega
app.use("/api/products", productRoutes); // Dashboard /api/products hit karega
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

module.exports = app;