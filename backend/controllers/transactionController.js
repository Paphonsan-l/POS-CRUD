const db = require('../config/db');

// Create a new transaction (checkout)
exports.createTransaction = async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { items, payment_method = 'cash' } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Cart is empty' 
      });
    }

    // Calculate totals
    let subtotal = 0;
    const taxRate = parseFloat(process.env.TAX_RATE) || 0.08;

    // Validate all items and check stock
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT id, name, price, quantity FROM products WHERE id = ? AND is_active = TRUE',
        [item.product_id]
      );

      if (products.length === 0) {
        await connection.rollback();
        return res.status(404).json({ 
          success: false, 
          error: `Product ID ${item.product_id} not found` 
        });
      }

      const product = products[0];

      if (product.quantity < item.quantity) {
        await connection.rollback();
        return res.status(400).json({ 
          success: false, 
          error: `Insufficient stock for ${product.name}. Available: ${product.quantity}` 
        });
      }

      subtotal += product.price * item.quantity;
    }

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Insert transaction
    const [transactionResult] = await connection.query(
      'INSERT INTO transactions (subtotal, tax, total, payment_method) VALUES (?, ?, ?, ?)',
      [subtotal, tax, total, payment_method]
    );

    const transactionId = transactionResult.insertId;

    // Insert transaction items and update product quantities
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT name, price FROM products WHERE id = ?',
        [item.product_id]
      );

      const product = products[0];
      const itemSubtotal = product.price * item.quantity;

      // Insert transaction item
      await connection.query(
        'INSERT INTO transaction_items (transaction_id, product_id, product_name, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
        [transactionId, item.product_id, product.name, item.quantity, product.price, itemSubtotal]
      );

      // Update product quantity
      await connection.query(
        'UPDATE products SET quantity = quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({ 
      success: true,
      data: {
        transaction_id: transactionId,
        subtotal,
        tax,
        total,
        items_count: items.length
      },
      message: 'Transaction completed successfully'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error creating transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const [rows] = await db.query(
      'SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get transaction by ID with items
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [transactions] = await db.query(
      'SELECT * FROM transactions WHERE id = ?',
      [id]
    );

    if (transactions.length === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    const [items] = await db.query(
      'SELECT * FROM transaction_items WHERE transaction_id = ?',
      [id]
    );

    res.json({ 
      success: true, 
      data: {
        ...transactions[0],
        items
      }
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get sales statistics
exports.getSalesStats = async (req, res) => {
  try {
    const [todaySales] = await db.query(`
      SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(total), 0) as total_revenue,
        COALESCE(AVG(total), 0) as average_transaction
      FROM transactions 
      WHERE DATE(transaction_date) = CURDATE()
    `);

    const [topProducts] = await db.query(`
      SELECT 
        p.name,
        p.image_url,
        SUM(ti.quantity) as total_sold,
        SUM(ti.subtotal) as revenue
      FROM transaction_items ti
      JOIN products p ON ti.product_id = p.id
      WHERE DATE(ti.created_at) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY ti.product_id
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    res.json({ 
      success: true, 
      data: {
        today: todaySales[0],
        topProducts
      }
    });
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
