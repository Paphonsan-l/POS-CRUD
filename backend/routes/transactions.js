const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// POST create transaction (checkout)
router.post('/checkout', transactionController.createTransaction);

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET transaction by ID
router.get('/:id', transactionController.getTransactionById);

// GET sales statistics
router.get('/stats/sales', transactionController.getSalesStats);

module.exports = router;
