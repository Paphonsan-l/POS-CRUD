const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const transactionRoutes = require('./routes/transactions');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'POS Backend API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to POS System API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      transactions: '/api/transactions',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;
