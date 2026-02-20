# 🛒 POS System with Back-office CRUD

ระบบ Point of Sale (POS) พร้อมระบบจัดการสินค้าแบบครบวงจร พัฒนาด้วย React, Node.js, Express, MySQL และ Docker พร้อมระบบ Authentication แบบ Role-based

## ✨ Features

### 🔐 Authentication System (ระบบยืนยันตัวตน)
- เข้าสู่ระบบด้วย Username/Password
- JWT Token Authentication
- Role-based Access Control (User/Admin)
- Protected Routes ป้องกันหน้าที่ต้องการสิทธิ์
- ลงทะเบียนผู้ใช้ใหม่
- จัดการข้อมูลผู้ใช้ (Admin)
- เปลี่ยนรหัสผ่าน
- Session Management อัตโนมัติ

### 🏪 POS Storefront (หน้าร้าน)
- แสดงสินค้าในรูปแบบ Grid พร้อมรูปภาพ ชื่อ และราคา
- ตะกร้าสินค้าพร้อมฟังก์ชันเพิ่ม/ลด/ลบสินค้า
- คำนวณราคารวมแบบ Real-time พร้อมภาษี 8%
- ระบบ Checkout พร้อมตรวจสอบสต๊อกสินค้า
- Responsive Design รองรับทุกขนาดหน้าจอ
- เข้าถึงได้โดยผู้ใช้ทุกสิทธิ์

### 👨‍💼 Admin Back-office (ระบบหลังบ้าน)
- CRUD ครบวงจรสำหรับจัดการสินค้า
- จัดการข้อมูล: ID, ชื่อ, ราคา, จำนวน, หมวดหมู่, รูปภาพ, SKU
- Dashboard แสดงสถิติการขาย
- ประวัติการทำธุรกรรม
- จัดการหมวดหมู่สินค้า
- RESTful API
- **เฉพาะ Admin เท่านั้น**

### 🗄️ Database
- MySQL Database พร้อม Normalized Schema
- ตาราง: Users, Categories, Products, Transactions, Transaction Items
- มีข้อมูลตัวอย่างพร้อมใช้งาน
- Password Hashing ด้วย bcrypt

## 🛠️ Tech Stack

| Frontend | Backend | Database | Security | Tools |
|----------|---------|----------|----------|-------|
| React 18 | Node.js | MySQL 8.0 | JWT | Docker |
| React Router | Express.js | phpMyAdmin | bcryptjs | Docker Compose |
| Axios | REST API | - | Token Auth | Git |
| Context API | - | - | - | - |

## 📁 โครงสร้างโปรเจกต์

```
POS-CRUD/
├── 📄 docker-compose.yml        # Docker orchestration
├── 📄 API_DOCUMENTATION.md      # API documentation
├── � AUTH_GUIDE.md             # Authentication guide
├── 📂 database/
│   └── init.sql                 # Database schema & sample data (with users)
├── 📂 backend/                  # Node.js + Express Backend
│   ├── Dockerfile
│   ├── package.json
│   ├── .env                     # Environment variables (JWT_SECRET)
│   ├── server.js                # Express server entry point
│   ├── config/
│   │   └── db.js                # Database connection
│   ├── controllers/             # Business logic
│   │   ├── authController.js    # Authentication logic
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── transactionController.js
│   ├── middleware/              # Express middleware
│   │   └── auth.js              # JWT verification & role check
│   └── routes/                  # API routes
│       ├── auth.js              # Auth routes
│       ├── products.js
│       ├── categories.js
│       └── transactions.js
└── 📂 frontend/                 # React Frontend
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js               # Main application with auth
        ├── context/
        │   └── AuthContext.js   # Global auth state
        ├── components/
        │   ├── Auth/            # Authentication components
        │   │   ├── Login.js
        │   │   ├── Register.js
        │   │   └── Auth.css
        │   ├── ProtectedRoute.js # Route protection
        │   ├── POS/             # POS components
        │   │   ├── POS.js
        │   │   ├── ProductGrid.js
        │   │   └── Cart.js
        │   └── Admin/           # Admin components (Admin only)
        │       ├── Dashboard.js
        │       ├── ProductList.js
        │       └── ProductForm.js
        └── services/
            └── api.js           # API service layer with interceptors
```
## 🎯 ฟีเจอร์เด่น

### 0. 🔐 ระบบ Authentication
- JWT Token-based Authentication
- Role-based Access Control (User/Admin)
- Protected Routes - เข้าถึงได้เฉพาะผู้ที่มีสิทธิ์
- Auto logout เมื่อ Token หมดอายุ
- Password Hashing ด้วย bcrypt
- Session Management
- หน้า Login/Register แบบไทย
- **5 บัญชีทดสอบพร้อมใช้งาน**

### 1. 🛒 ระบบ POS
- เลือกซื้อสินค้าได้ง่าย
- ปรับจำนวนสินค้าแบบเรียลไทม์
- คำนวณภาษี 8% อัตโนมัติ
- ตรวจสอบสต๊อกก่อนชำระเงิน
- อัปเดตสต๊อกอัตโนมัติหลังชำระเงิน

### 2. 📊 Dashboard (Admin เท่านั้น)
- สถิติการขายวันนี้
- สินค้าขายดี
- ธุรกรรมล่าสุด
- ข้อมูลสรุปแบบเรียลไทม์

### 3. 📦 จัดการสินค้า (Admin เท่านั้น)
- เพิ่ม/แก้ไข/ลบสินค้า
- อัปโหลดรูปภาพผ่าน URL
- จัดหมวดหมู่สินค้า
- ติดตามสต๊อก
- แจ้งเตือนสินค้าใกล้หมด

### 4. 💰 ระบบธุรกรรม
- หักสต๊อกอัตโนมัติ
- คำนวณภาษี
- ประวัติการซื้อขาย
- ตรวจสอบสต๊อกก่อนขาย

## 👤 บัญชีทดสอบ (Demo Credentials)

### Admin Accounts (เข้าถึงได้ทุกหน้า)
| Username | Password | Role | สิทธิ์ |
|----------|----------|------|---------|
| admin | password123 | Admin | ทุกหน้า (POS + Dashboard + Products) |
| manager | password123 | Admin | ทุกหน้า |

### User Accounts (เข้าถึงเฉพาะ POS)
| Username | Password | Role | สิทธิ์ |
|----------|----------|------|---------|
| cashier1 | password123 | User | POS เท่านั้น |
| cashier2 | password123 | User | POS เท่านั้น |
| user | password123 | User | POS เท่านั้น |

**💡 Tips:** ในหน้า Login มีปุ่ม "👨‍💼 Admin Demo" และ "👤 User Demo" สำหรับกรอกข้อมูลอัตโนมัติ

## 📦 ข้อมูลตัวอย่าง

ระบบมีข้อมูลพร้อมใช้:
- ✅ 5 ผู้ใช้ (2 Admin + 3 User)
- ✅ 5 หมวดหมู่สินค้า
- ✅ 12 สินค้าตัวอย่างพร้อมรูปภาพ
- ✅ ราคาและสต๊อกหลากหลาย

## 📝 เอกสารเพิ่มเติม

- [AUTH_GUIDE.md](AUTH_GUIDE.md) - 🔐 คู่มือการใช้งานระบบ Authentication (ภาษาไทย)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - รายละเอียด API ทั้งหมด
- [Overview.md](Overview.md) - คู่มือโดยละเอียด

## 🚀 Quick Start

### ขั้นตอนการติดตั้ง

1. **Clone โปรเจกต์**
```bash
git clone <repository-url>
cd POS-CRUD
```

2. **เริ่มระบบด้วย Docker**
```bash
docker-compose up --build
```

3. **รอให้ระบบเตรียมพร้อม (1-2 นาที)**
   - MySQL จะสร้างฐานข้อมูลและตาราง
   - Backend จะเชื่อมต่อกับฐานข้อมูล
   - Frontend จะ compile

4. **เข้าใช้งานระบบ**
   - Frontend: http://localhost:3000 (จะ redirect ไปหน้า Login)
   - Backend API: http://localhost:5000/api
   - phpMyAdmin: http://localhost:8080 (root/rootpassword)

5. **Login ด้วยบัญชีทดสอบ**
   - Admin: `admin` / `password123`
   - User: `cashier1` / `password123`

### ⚠️ หมายเหตุสำคัญ

- หากมีการเปลี่ยนแปลง `package.json` หรือ `init.sql` ต้องรันคำสั่ง:
  ```bash
  docker-compose down -v
  docker-compose up --build
  ```
- `-v` จะลบ volumes และสร้างฐานข้อมูลใหม่พร้อมบัญชีทดสอบ

## 🔒 Security Notes

- **Production:** เปลี่ยน `JWT_SECRET` ใน `.env` เป็นค่าที่ปลอดภัย
- **Production:** ใช้ HTTPS
- **Production:** เปลี่ยนรหัสผ่าน database
- Token มีอายุ 7 วัน (ตั้งค่าได้ใน `JWT_EXPIRES_IN`)

## 📄 License

โปรเจกต์นี้เป็น Open Source สำหรับการศึกษา

## 👨‍💻 Author

พัฒนาเพื่อเป็นตัวอย่างระบบ POS แบบ Full-stack

---

**สร้างด้วย ❤️ | Made with React, Node.js, Express & MySQL**
