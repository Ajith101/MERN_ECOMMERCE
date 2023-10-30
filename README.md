# ECOMMERCE MERN App

![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/74018846-dd40-4883-ba9f-f27965ade4a2)
![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/85523db2-0353-4e56-867f-0459384946a7)

This is a E-commerce App, designed to showcase a collection of products with categories and Brand and search functionality. The application provides users with an interface to browse through a wide range of products, view product details, and filter products based on categories. Additionally, it includes a shopping cart functionality that allows users to add products to their cart and proceed to checkout. The app is built using modern web development technologies to ensure high performance and responsiveness.

## Features

- Product Catalog: Browse through a collection of products with categories,brand and search functionality.
- Product Details: View detailed information about each product.
- Categories: Filter products based on different categories.
- Brand: Filter products based on different Brands.
- Add to Cart: Users can add products to their shopping cart.
- Shopping Cart: View and manage the items added to the shopping cart.
- Login & register
- Forgot Password

## Features of Admin Side

- Product Listing Dashboard
- Add and edit products
- Add and edit Categories.
- Add and edit Brand.
- User management.
- Delete existing content
- Pagination

## Technologies Used

- Frontend:

  - React: A JavaScript library for building user interfaces.
  - Zustand: A state management library for managing application state with simplicity.
  - Tailwind: A CSS framework for responsive and modern UI design.
  - Axios: A popular JavaScript library for making HTTP requests.
  - Swiper: A modern and mobile-friendly slider library.

- Backend:
  - Node.js: A server-side JavaScript runtime environment.
  - Express: A web application framework for Node.js.
  - Cors: A middleware for enabling Cross-Origin Resource Sharing.
  - Dotenv: A module for loading environment variables from a .env file.
  - Morgan: A middleware for logging HTTP requests.
  - JSON Web Tokens (JWT): For secure user authentication and authorization.
  - Nodemailer: To send password reset emails to users for enhanced security.
  - Bcrypt: To securely hash and store user password in the database.
  - Cloudinary: For efficient image hosting, retrieval,and management.
  - cookie-parser: A middleware which parses cookies attached to the client request object.

## Screenshot

![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/1f1a3fea-f8d3-4721-812c-9add1190a247)
![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/affa9124-ab77-4764-8a8e-3003bb738402)
![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/8a53a10c-2c5a-44a4-9e17-dd37cdca44fb)
![Shopping App](https://github.com/Ajith101/MERN_ECOMMERCE/assets/41799543/77e719eb-9962-4396-83e0-4ec5ae1daa32)

## Installation

- Clone the repository from GitHub.
- Install Node.js on your system if you haven't already.
- Run

```
npm install
```

in the root directory to install the required dependencies.

- Configure the MongoDB connection string in the server configuration file.
- Set up Cloudinary account and obtain necessary credentials for image hosting.
- Run

```
npm run dev
```

start to start the development server.

### In `.env` file inside client, put

```
VITE_DB_URL = http://your--host-name
```
