<<<<<<< HEAD
# Full Stack E-commerce Project

A modern e-commerce application built with Node.js, React, and PostgreSQL, featuring user authentication, product management, shopping cart functionality, and order processing.

## 📋 Features

- User authentication and authorization
- Product catalog with categories
- Shopping cart management
- Order processing and tracking
- Responsive design for all devices
- Secure user data handling

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Authentication middleware
- MVC architecture

### Frontend
- React.js
- Axios for API calls
- CSS for styling
- React Router for navigation

## 🗂️ Project Structure

### Backend (`/backend`)
```
backend/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── databasePostgres.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── middlewareAuthentication.js
│   ├── models/
│   │   ├── cart.js
│   │   ├── category.js
│   │   ├── order.js
│   │   └── product.js
│   └── routes/
│       ├── cartRoutes.js
│       └── categoryRoutes.js
```

### Frontend (`/frontend`)
```
frontend/
├── node_modules/
├── public/
├── src/
│   ├── API/
│   │   └── axiosConfig.js
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   └── Register.jsx
│   └── styles/
│       ├── App.css
│       └── index.css
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=ecommerce_db
   JWT_SECRET=your_jwt_secret
   ```

4. Set up the database:
   ```bash
   # Create PostgreSQL database
   psql -U postgres
   CREATE DATABASE ecommerce_db;
   ```

5. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```

## 🔑 API Endpoints

- Auth:
  - `POST /api/auth/register`: Register new user
  - `POST /api/auth/login`: Login user

- Products:
  - `GET /api/products`: Get all products
  - `GET /api/products/:id`: Get single product
  - `POST /api/products`: Create product (Admin)
  - `PUT /api/products/:id`: Update product (Admin)
  - `DELETE /api/products/:id`: Delete product (Admin)

- Cart:
  - `GET /api/cart`: Get user's cart
  - `POST /api/cart`: Add item to cart
  - `PUT /api/cart/:id`: Update cart item
  - `DELETE /api/cart/:id`: Remove item from cart

- Orders:
  - `GET /api/orders`: Get user's orders
  - `POST /api/orders`: Create new order
  - `GET /api/orders/:id`: Get order details

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
=======
# ecommerce

project using mongoDB, PostgreSQL, React.js, Node.js and Express
>>>>>>> ea25470b24552a7a48a2d073569fbbb32cd80b38
