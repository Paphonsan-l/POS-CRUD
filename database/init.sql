-- Create Database
CREATE DATABASE IF NOT EXISTS pos_db;
USE pos_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    category_id INT,
    image_url VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_sku (sku),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Transactions Table (Sales)
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cash',
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (transaction_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Transaction Items Table (Line items for each sale)
CREATE TABLE IF NOT EXISTS transaction_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_transaction (transaction_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Food & Beverages', 'Food items and drinks'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and publications'),
('Home & Garden', 'Home improvement and garden supplies');

-- Insert Sample Products
INSERT INTO products (name, description, price, quantity, category_id, image_url, sku) VALUES
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 29.99, 50, 1, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 'ELEC-001'),
('Mechanical Keyboard', 'RGB backlit mechanical gaming keyboard', 89.99, 30, 1, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 'ELEC-002'),
('USB-C Cable', 'High-speed USB-C charging cable 6ft', 12.99, 100, 1, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400', 'ELEC-003'),
('Coffee Beans', 'Premium Arabica coffee beans 500g', 18.50, 75, 2, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', 'FOOD-001'),
('Green Tea', 'Organic green tea leaves 100g', 9.99, 120, 2, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', 'FOOD-002'),
('Protein Bar', 'High protein energy bar - chocolate flavor', 3.50, 200, 2, 'https://images.unsplash.com/photo-1606312619070-d48b4ccd8bf6?w=400', 'FOOD-003'),
('Cotton T-Shirt', 'Plain cotton t-shirt - various colors', 19.99, 80, 3, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'CLTH-001'),
('Denim Jeans', 'Classic fit denim jeans', 49.99, 40, 3, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 'CLTH-002'),
('Programming Book', 'Learn JavaScript - Complete guide', 45.00, 25, 4, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 'BOOK-001'),
('Notebook Set', 'Set of 3 lined notebooks', 15.99, 60, 4, 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400', 'BOOK-002'),
('Plant Pot', 'Ceramic plant pot with drainage - medium', 24.99, 35, 5, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', 'HOME-001'),
('LED Desk Lamp', 'Adjustable LED desk lamp with touch control', 34.99, 45, 5, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 'HOME-002');
