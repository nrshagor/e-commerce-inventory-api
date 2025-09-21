## E-Commerce Inventory API

A RESTful API for an e-commerce inventory system built with NestJS, TypeORM, and PostgreSQL.
Includes JWT-based authentication, secure CRUD operations for products and categories, and Swagger API documentation.

### Features

- Authentication

- User registration & login

- JWT-based authentication

- Product Management

- Create, update, delete products

- Filtering by category, price range

- Pagination & search

- Category Management

- Create, update, delete categories

- List categories with product counts

### Database

PostgreSQL with TypeORM

One-to-many relationship (Category ↔ Products)

### API Documentation

- Swagger with example payloads

### Tech Stack

- Backend: NestJS (TypeScript)

- Database: PostgreSQL

- ORM: TypeORM

- Authentication: JWT + Passport

- Docs: Swagger (@nestjs/swagger)

### Installation

Clone the repository

```
git clone https://github.com/nrshagor/e-commerce-inventory-api.git
```

```
cd ecommerce-inventory-api
```

#### Install dependencies

```
npm install
```

#### Set up environment variables

Create a .env file in the root directory:

```
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=database_name
JWT_SECRET='your_jwt_secret'
```

#### Start the project

```
npm run start:dev
```

#### API Endpoints

Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login and get JWT token

Categories

POST /api/categories → Create category

GET /api/categories → List all categories (with product counts)

GET /api/categories/:id → Get category by ID

PUT /api/categories/:id → Update category

DELETE /api/categories/:id → Delete category (only if no linked products)

Products

POST /api/products → Create product

GET /api/products → List all products

Filters: ?categoryId=1&minPrice=100&maxPrice=500&page=1&limit=10

GET /api/products/:id → Get product by ID

PUT /api/products/:id → Update product

DELETE /api/products/:id → Delete product

GET /api/products/search?q=keyword → Search products

### Swagger Docs

API docs are available at:

Example Test Payloads
Register User

```
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Passw0rd123",
  "confirmPassword": "Passw0rd123",
  "role": "USER"
}
```

Create Category

```
{
  "name": "Electronics",
  "description": "Devices and gadgets"
}
```

Create Product

```
{
  "name": "iPhone 15 Pro",
  "description": "Latest Apple smartphone",
  "price": 1299.99,
  "stock": 50,
  "categoryId": 1,
  "imageUrl": "https://example.com/images/iphone.jpg"
}
```

## Author

Developed by - [@nrshagor](https://www.github.com/nrshagor)
git
