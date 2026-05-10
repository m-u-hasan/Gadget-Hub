# GadgetHub

# GadgetHub – Software Requirements Specification (SRS)

## 1. Project Overview

**Project Name:** GadgetHub

**Type:** Electronics & Gadget eCommerce Platform

**Tech Stack:** MERN (MongoDB, Express.js, React/Next.js, Node.js)

### Objective

A modern electronics store focused on:

- Advanced product filtering (spec-based)
- Tech product comparison
- High-performance scalable API
- Clean, modern UI

---

## 2. User Roles

### 2.1 Guest User

- Browse products
- View specs & details
- Search & filter
- Cannot purchase

---

### 2.2 Customer (Authenticated User)

- Add to cart & checkout
- Compare products
- Save wishlist

---

### 2.3 Admin

- Manage products & specs
- Manage orders
- Monitor inventory

---

## 3. Functional Requirements

---

## 3.1 Home Page

### Features

- Hero banner (latest gadgets)
- Categories (Mobile, Laptop, Accessories)
- Trending products
- Deals & offers

### Functionalities

- API-based listing
- Category + brand filtering
- Responsive UI

---

## 3.2 Authentication System

### Features

- JWT authentication
- Role-based access
- Secure login/register

---

## 3.3 Product Module

### Product List

- Grid view
- Advanced filters:
    - Brand
    - Price
    - RAM
    - Storage
    - Processor
    - Rating

---

### Product Details

- Image gallery
- Full specifications table
- Compare option
- Add to cart

---

## 3.4 Cart & Checkout

### Features

- Add/remove/update items
- Price calculation

### Checkout

- Shipping address
- Payment option (Cash/Online)
- Order confirmation

---

## 3.5 User Dashboard

### Sections

**Orders**

- View order history
- Track order status

**Wishlist**

- Save products

**Compare List**

- Compare selected products

---

## 3.6 Admin Dashboard

---

### Overview

- Total products
- Low stock alerts
- Sales analytics

---

### Products Management

- Add / update / delete products
- Manage specs dynamically
- Upload images

---

### Orders Management

- View all orders
- Update order status

---

### Users Management

- View users
- Track activity

---

## 4. Database Design (MongoDB)

### Users

```
{
name,
email,
password,
role: "user" | "admin",
wishlist: [],
compareList: [],
createdAt
}
```

---

### Products

```
{
name,
brand,
category,
price,
stock,
specs: {
  ram,
  storage,
  processor,
  battery
},
rating,
images: [],
description
}
```

---

### Orders

```
{
userId,
items: [{ productId, quantity }],
totalPrice,
status,
shippingAddress,
createdAt
}
```

---

## 5. API Structure

### Auth

- POST /api/auth/register
- POST /api/auth/login

---

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)

---

### Orders

- POST /api/orders
- GET /api/orders/user
- GET /api/orders (admin)

---

### Users

- PUT /api/users/wishlist
- PUT /api/users/compare

---

## 6. Security Requirements

- JWT authentication
- Password hashing
- Role-based authorization
- Rate limiting

---

## 7. Non-Functional Requirements

### Performance

- Optimized filtering queries

### Scalability

- Handle large product specs data

---

## 8. UI/UX Requirements

- Modern tech theme (blue + dark)
- Card-based layout
- Clean spec tables
- Fast navigation