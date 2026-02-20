# POS System with Back-office CRUD

A complete Point of Sale (POS) system with inventory management, built with React, Node.js, Express, MySQL, and Docker.

## 🚀 Features

### Frontend (POS Storefront)
- Display products in a responsive grid with images, names, and prices
- Shopping cart with add/remove items and quantity adjustment
- Real-time price calculation with tax (8%)
- Checkout functionality with stock validation
- Responsive design for all screen sizes

### Backend (Admin Back-office)
- Complete CRUD operations for products
- Product management: ID, Name, Price, Quantity, Category, Image URL, SKU
- Dashboard with sales statistics
- Transaction history
- Category management
- RESTful API endpoints

### Database
- MySQL database with normalized schema
- Categories, Products, Transactions, and Transaction Items tables
- Sample data included for quick testing

## 📋 Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Database Management**: phpMyAdmin
- **Containerization**: Docker, Docker Compose

## 📁 Project Structure

```
POS-CRUD/
├── docker-compose.yml          # Docker orchestration
├── database/
│   └── init.sql                # Database schema and sample data
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server entry point
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controllers/            # Business logic
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── transactionController.js
│   └── routes/                 # API routes
│       ├── products.js
│       ├── categories.js
│       └── transactions.js
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js              # Main application
        ├── App.css
        ├── index.js
        ├── index.css
        ├── components/
        │   ├── POS/            # Point of Sale components
        │   │   ├── POS.js
        │   │   ├── POS.css
        │   │   ├── ProductGrid.js
        │   │   └── Cart.js
        │   └── Admin/          # Admin panel components
        │       ├── Dashboard.js
        │       ├── Dashboard.css
        │       ├── ProductList.js
        │       ├── ProductList.css
        │       ├── ProductForm.js
        │       └── ProductForm.css
        └── services/
            └── api.js          # API service layer
```

## 🐳 Getting Started with Docker

### Prerequisites

- Docker Desktop installed
- Docker Compose installed
- Ports 3000, 5000, 3306, and 8080 available

### Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd POS-CRUD
   ```

2. **Start all services with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build the frontend and backend images
   - Start MySQL database
   - Start phpMyAdmin
   - Initialize the database with sample data
   - Start the backend API server
   - Start the React development server

3. **Wait for all services to be ready** (approximately 1-2 minutes):
   - MySQL will initialize and create tables
   - Backend will connect to the database
   - Frontend will compile and start

### Access the Application

- **POS Storefront**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Product Management**: http://localhost:3000/admin/products
- **Backend API**: http://localhost:5000/api
- **phpMyAdmin**: http://localhost:8080
  - Server: `mysql`
  - Username: `root`
  - Password: `rootpassword`

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)
- `GET /api/products/:id/stock` - Check stock availability

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Transactions
- `POST /api/transactions/checkout` - Create transaction (checkout)
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID with items
- `GET /api/transactions/stats/sales` - Get sales statistics

## 📊 Database Schema

### Categories Table
```sql
- id (INT, Primary Key, Auto Increment)
- name (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Products Table
```sql
- id (INT, Primary Key, Auto Increment)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- quantity (INT)
- category_id (INT, Foreign Key)
- image_url (VARCHAR)
- sku (VARCHAR, Unique)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Transactions Table
```sql
- id (INT, Primary Key, Auto Increment)
- transaction_date (TIMESTAMP)
- subtotal (DECIMAL)
- tax (DECIMAL)
- total (DECIMAL)
- payment_method (VARCHAR)
- status (VARCHAR)
- created_at (TIMESTAMP)
```

### Transaction Items Table
```sql
- id (INT, Primary Key, Auto Increment)
- transaction_id (INT, Foreign Key)
- product_id (INT, Foreign Key)
- product_name (VARCHAR)
- quantity (INT)
- unit_price (DECIMAL)
- subtotal (DECIMAL)
- created_at (TIMESTAMP)
```

## 🛠️ Development

### Stop the application
```bash
docker-compose down
```

### Stop and remove volumes (clears database)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Rebuild after code changes
```bash
docker-compose up --build
```

### Run without Docker (Manual Setup)

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Database
- Install MySQL locally
- Run the SQL script in `database/init.sql`
- Update connection details in `backend/.env`

## 🔧 Environment Variables

### Backend (.env)
```env
DB_HOST=mysql
DB_USER=pos_user
DB_PASSWORD=pos_password
DB_NAME=pos_db
DB_PORT=3306
PORT=5000
TAX_RATE=0.08
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ✨ Key Features Explained

### 1. POS Storefront
- Browse products with images and prices
- Add products to cart
- Adjust quantities
- View real-time subtotal, tax, and total
- Complete checkout with inventory updates

### 2. Admin Dashboard
- View today's sales statistics
- See top-selling products
- Monitor recent transactions
- Quick access to product management

### 3. Product Management
- Create, Read, Update, Delete products
- Upload product images via URL
- Categorize products
- Track inventory levels
- Set product active/inactive status
- Low stock alerts

### 4. Transaction System
- Automatic inventory deduction
- Tax calculation (8% configurable)
- Transaction history with details
- Stock validation before checkout

## 🔒 Database Credentials

### MySQL Root
- Username: `root`
- Password: `rootpassword`

### Application User
- Username: `pos_user`
- Password: `pos_password`
- Database: `pos_db`

## 📝 Sample Data

The system comes pre-loaded with:
- 5 categories (Electronics, Food & Beverages, Clothing, Books, Home & Garden)
- 12 sample products with images
- Various price points and stock levels

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
```bash
# Find and stop the process using the port
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change the port in docker-compose.yml
```

### Database Connection Failed
- Wait for MySQL to fully initialize (check logs: `docker-compose logs mysql`)
- Ensure MySQL health check passes before backend starts

### Frontend Can't Connect to Backend
- Verify backend is running: http://localhost:5000/api/health
- Check CORS settings in backend
- Ensure network bridge is properly configured in Docker

### Images Not Loading
- Verify image URLs are accessible
- Check browser console for CORS or network errors
- Use alternative image hosting or local images

## 🚀 Production Deployment

For production deployment:
1. Use environment-specific `.env` files
2. Set `NODE_ENV=production`
3. Build optimized frontend: `npm run build`
4. Use production-grade web server (nginx)
5. Implement proper authentication/authorization
6. Use SSL/TLS certificates
7. Implement rate limiting and security headers
8. Regular database backups

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a full-stack POS system demonstration project.

---

**Happy Coding! 🎉**
