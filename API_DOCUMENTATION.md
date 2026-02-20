# POS System API Documentation

Base URL: `http://localhost:5000/api`

## 📦 Products API

### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with USB receiver",
      "price": 29.99,
      "quantity": 50,
      "category_id": 1,
      "category_name": "Electronics",
      "image_url": "https://example.com/image.jpg",
      "sku": "ELEC-001",
      "is_active": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Product by ID
```http
GET /api/products/:id
```

**Example:** `GET /api/products/1`

### Create Product
```http
POST /api/products
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 29.99,
  "quantity": 100,
  "category_id": 1,
  "image_url": "https://example.com/image.jpg",
  "sku": "PROD-001"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "name": "New Product",
    "price": 29.99,
    "quantity": 100
  },
  "message": "Product created successfully"
}
```

### Update Product
```http
PUT /api/products/:id
Content-Type: application/json
```

**Example:** `PUT /api/products/1`

**Request Body (partial update supported):**
```json
{
  "name": "Updated Product Name",
  "price": 39.99,
  "quantity": 75
}
```

### Delete Product (Soft Delete)
```http
DELETE /api/products/:id
```

**Example:** `DELETE /api/products/1`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Check Stock Availability
```http
GET /api/products/:id/stock?quantity=5
```

**Response:**
```json
{
  "success": true,
  "available": true,
  "currentStock": 50,
  "productName": "Wireless Mouse"
}
```

---

## 🏷️ Categories API

### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices and accessories",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Category
```http
POST /api/categories
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category description"
}
```

### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json
```

### Delete Category
```http
DELETE /api/categories/:id
```

---

## 💳 Transactions API

### Create Transaction (Checkout)
```http
POST /api/transactions/checkout
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 4,
      "quantity": 1
    }
  ],
  "payment_method": "cash"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": 1,
    "subtotal": 78.48,
    "tax": 6.28,
    "total": 84.76,
    "items_count": 2
  },
  "message": "Transaction completed successfully"
}
```

**Error Response (Insufficient Stock):**
```json
{
  "success": false,
  "error": "Insufficient stock for Wireless Mouse. Available: 5"
}
```

### Get All Transactions
```http
GET /api/transactions?limit=50&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "transaction_date": "2024-01-01T10:30:00.000Z",
      "subtotal": 78.48,
      "tax": 6.28,
      "total": 84.76,
      "payment_method": "cash",
      "status": "completed",
      "created_at": "2024-01-01T10:30:00.000Z"
    }
  ]
}
```

### Get Transaction by ID
```http
GET /api/transactions/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "transaction_date": "2024-01-01T10:30:00.000Z",
    "subtotal": 78.48,
    "tax": 6.28,
    "total": 84.76,
    "payment_method": "cash",
    "status": "completed",
    "created_at": "2024-01-01T10:30:00.000Z",
    "items": [
      {
        "id": 1,
        "transaction_id": 1,
        "product_id": 1,
        "product_name": "Wireless Mouse",
        "quantity": 2,
        "unit_price": 29.99,
        "subtotal": 59.98,
        "created_at": "2024-01-01T10:30:00.000Z"
      }
    ]
  }
}
```

### Get Sales Statistics
```http
GET /api/transactions/stats/sales
```

**Response:**
```json
{
  "success": true,
  "data": {
    "today": {
      "total_transactions": 5,
      "total_revenue": 423.50,
      "average_transaction": 84.70
    },
    "topProducts": [
      {
        "name": "Wireless Mouse",
        "image_url": "https://example.com/image.jpg",
        "total_sold": 15,
        "revenue": 449.85
      }
    ]
  }
}
```

---

## 🔍 Testing with cURL

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 19.99,
    "quantity": 50,
    "category_id": 1,
    "sku": "TEST-001"
  }'
```

### Update a Product
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24.99,
    "quantity": 45
  }'
```

### Checkout (Create Transaction)
```bash
curl -X POST http://localhost:5000/api/transactions/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 4, "quantity": 1}
    ],
    "payment_method": "cash"
  }'
```

---

## 🧪 Testing with Postman

1. Import the following as a Postman Collection
2. Set Base URL variable: `http://localhost:5000/api`
3. Test each endpoint

### Collection Structure
```
POS System API
├── Health Check (GET /health)
├── Products
│   ├── Get All Products (GET /products)
│   ├── Get Product by ID (GET /products/:id)
│   ├── Create Product (POST /products)
│   ├── Update Product (PUT /products/:id)
│   ├── Delete Product (DELETE /products/:id)
│   └── Check Stock (GET /products/:id/stock)
├── Categories
│   ├── Get All Categories (GET /categories)
│   ├── Create Category (POST /categories)
│   ├── Update Category (PUT /categories/:id)
│   └── Delete Category (DELETE /categories/:id)
└── Transactions
    ├── Checkout (POST /transactions/checkout)
    ├── Get All Transactions (GET /transactions)
    ├── Get Transaction by ID (GET /transactions/:id)
    └── Get Sales Stats (GET /transactions/stats/sales)
```

---

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔐 Environment Configuration

### Tax Rate
The tax rate is configurable in `backend/.env`:
```env
TAX_RATE=0.08  # 8% tax
```

### Database Configuration
Connection settings in `backend/.env`:
```env
DB_HOST=mysql
DB_USER=pos_user
DB_PASSWORD=pos_password
DB_NAME=pos_db
DB_PORT=3306
```
