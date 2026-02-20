# 🛒 POS System with Back-office CRUD

ระบบ Point of Sale (POS) พร้อมระบบจัดการสินค้าแบบครบวงจร พัฒนาด้วย React, Node.js, Express, MySQL และ Docker

## ✨ Features

### 🏪 POS Storefront (หน้าร้าน)
- แสดงสินค้าในรูปแบบ Grid พร้อมรูปภาพ ชื่อ และราคา
- ตะกร้าสินค้าพร้อมฟังก์ชันเพิ่ม/ลด/ลบสินค้า
- คำนวณราคารวมแบบ Real-time พร้อมภาษี 8%
- ระบบ Checkout พร้อมตรวจสอบสต๊อกสินค้า
- Responsive Design รองรับทุกขนาดหน้าจอ

### 👨‍💼 Admin Back-office (ระบบหลังบ้าน)
- CRUD ครบวงจรสำหรับจัดการสินค้า
- จัดการข้อมูล: ID, ชื่อ, ราคา, จำนวน, หมวดหมู่, รูปภาพ, SKU
- Dashboard แสดงสถิติการขาย
- ประวัติการทำธุรกรรม
- จัดการหมวดหมู่สินค้า
- RESTful API

### 🗄️ Database
- MySQL Database พร้อม Normalized Schema
- ตาราง: Categories, Products, Transactions, Transaction Items
- มีข้อมูลตัวอย่างพร้อมใช้งาน

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| React 18 | Node.js | MySQL 8.0 | Docker |
| React Router | Express.js | phpMyAdmin | Docker Compose |
| Axios | REST API | - | Git |

## 📁 โครงสร้างโปรเจกต์

```
POS-CRUD/
├── 📄 docker-compose.yml        # Docker orchestration
├── 📄 API_DOCUMENTATION.md      # API documentation
├── 📂 database/
│   └── init.sql                 # Database schema & sample data
├── 📂 backend/                  # Node.js + Express Backend
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js                # Express server entry point
│   ├── config/
│   │   └── db.js                # Database connection
│   ├── controllers/             # Business logic
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── transactionController.js
│   └── routes/                  # API routes
│       ├── products.js
│       ├── categories.js
│       └── transactions.js
└── 📂 frontend/                 # React Frontend
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js               # Main application
        ├── components/
        │   ├── POS/             # POS components
        │   │   ├── POS.js
        │   │   ├── ProductGrid.js
        │   │   └── Cart.js
        │   └── Admin/           # Admin components
        │       ├── Dashboard.js
        │       ├── ProductList.js
        │       └── ProductForm.js
        └── services/
            └── api.js           # API service layer
```
## 🎯 ฟีเจอร์เด่น

### 1. 🛒 ระบบ POS
- เลือกซื้อสินค้าได้ง่าย
- ปรับจำนวนสินค้าแบบเรียลไทม์
- คำนวณภาษี 8% อัตโนมัติ
- ตรวจสอบสต๊อกก่อนชำระเงิน
- อัปเดตสต๊อกอัตโนมัติหลังชำระเงิน

### 2. 📊 Dashboard
- สถิติการขายวันนี้
- สินค้าขายดี
- ธุรกรรมล่าสุด
- ข้อมูลสรุปแบบเรียลไทม์

### 3. 📦 จัดการสินค้า
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

## 📦 ข้อมูลตัวอย่าง

ระบบมีข้อมูลพร้อมใช้:
- ✅ 5 หมวดหมู่สินค้า
- ✅ 12 สินค้าตัวอย่างพร้อมรูปภาพ
- ✅ ราคาและสต๊อกหลากหลาย

## 📝 เอกสารเพิ่มเติม

- [API Documentation](API_DOCUMENTATION.md) - รายละเอียด API ทั้งหมด
- [Overview](Overview.md) - คู่มือโดยละเอียด

## 📄 License

โปรเจกต์นี้เป็น Open Source สำหรับการศึกษา

## 👨‍💻 Author

พัฒนาเพื่อเป็นตัวอย่างระบบ POS แบบ Full-stack

---

**สร้างด้วย ❤️ | Made with React, Node.js, Express & MySQL**
