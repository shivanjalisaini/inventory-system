# Inventory Management Dashboard

A clean, full-stack inventory management system built for merchants to manage products, track stock levels, and view key inventory analytics.

---

## Overview

This application enables merchants to:

* Manage products with full CRUD operations
* Monitor low-stock and out-of-stock items visually
* View inventory analytics at a glance
* Search, filter, and sort products efficiently

The frontend (React) consumes REST APIs exposed by the backend (Node.js + Express).

---

## Key Features

* Product CRUD (Create, Read, Update, Delete)
* Color-coded stock status (Green / Yellow / Red)
* Inventory analytics dashboard
* Low-stock alerts section
* Search by product name or SKU
* Filter by stock status
* Sort by name, price, stock, or SKU
* Form validation with user-friendly error messages

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios

### Backend

* Node.js
* Express

### Storage

* In-memory JavaScript array (no database)

### API Style

* RESTful APIs

---

## Project Structure

```
inventory-management/
│
├── backend/
│   ├── controllers/
│   │   └── productController.js
│   ├── data/
│   │   └── products.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Documentation

### Base URL

```
/api/products
```

### Endpoints

| Method | Endpoint            | Description            |
| -----: | ------------------- | ---------------------- |
|    GET | /products           | Get all products       |
|    GET | /products/:id       | Get product by ID      |
|   POST | /products           | Create a new product   |
|    PUT | /products/:id       | Update a product       |
| DELETE | /products/:id       | Delete a product       |
|    GET | /products/analytics | Inventory analytics    |
|    GET | /products/low-stock | Low-stock product list |

---

## Data Model

```js
{
  id: "1",
  name: "Wireless Mouse",
  sku: "WM-001",
  price: 29.99,
  stock: 45,
  minStockThreshold: 10
}
```

---

## Stock Status Logic

| Condition                               | Status       | Color  |
| --------------------------------------- | ------------ | ------ |
| stock > minStockThreshold               | In Stock     | Green  |
| stock <= minStockThreshold && stock > 0 | Low Stock    | Yellow |
| stock === 0                             | Out of Stock | Red    |

---

## Validation & Error Handling

### Backend Validation Rules

* Product name is required
* SKU is required and must be unique
* Price must be a non-negative number
* Stock must be a non-negative number
* Minimum stock threshold must be non-negative

### HTTP Status Codes

* **201** – Product created successfully
* **400** – Invalid input data
* **404** – Product not found
* **500** – Internal server error

---

## Deployment

* Backend: Render
* Frontend: Vercel or Netlify

> Note: Update Axios base URL in `frontend/src/services/api.js` for production.

---

## Limitations

* In-memory storage (data resets on server restart)
* No authentication or authorization
* Not designed for production-scale usage

---

## Future Enhancements

* Database integration (MongoDB / PostgreSQL)
* Authentication and role-based access control
* Pagination and server-side filtering
* Inventory report export (CSV / PDF)
* Real-time stock notifications

---

## Author

Developed as a full-stack assignment project to demonstrate RESTful API design, React frontend integration, and clean backend architecture.
