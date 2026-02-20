const db = require('../config/db');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE
      ORDER BY p.name
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category_id, image_url, sku } = req.body;
    
    // Validation
    if (!name || !price || quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, price, and quantity are required' 
      });
    }

    const [result] = await db.query(`
      INSERT INTO products (name, description, price, quantity, category_id, image_url, sku)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, description, price, quantity, category_id, image_url, sku]);

    res.status(201).json({ 
      success: true, 
      data: { id: result.insertId, name, price, quantity },
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category_id, image_url, sku, is_active } = req.body;

    const [result] = await db.query(`
      UPDATE products 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          price = COALESCE(?, price),
          quantity = COALESCE(?, quantity),
          category_id = COALESCE(?, category_id),
          image_url = COALESCE(?, image_url),
          sku = COALESCE(?, sku),
          is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [name, description, price, quantity, category_id, image_url, sku, is_active, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ 
      success: true, 
      message: 'Product updated successfully' 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete product (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query(`
      UPDATE products SET is_active = FALSE WHERE id = ?
    `, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Check product availability and stock
exports.checkStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.query;

    const [rows] = await db.query(`
      SELECT id, name, quantity, price 
      FROM products 
      WHERE id = ? AND is_active = TRUE
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const product = rows[0];
    const available = product.quantity >= (quantity || 1);

    res.json({ 
      success: true, 
      available,
      currentStock: product.quantity,
      productName: product.name
    });
  } catch (error) {
    console.error('Error checking stock:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
