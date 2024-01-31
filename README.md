# MirrAR Backend Mini Project

This is a backend project that implements a product API for MirrAR. Below, you will find comprehensive documentation on how to run the project, interact with the API, details on architectural decisions, and other necessary instructions.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project](#running-the-project)
- [Interacting with the API](#interacting-with-the-api)
  - [Endpoints](#endpoints)
- [Architectural Decisions](#architectural-decisions)
- [Testing](#testing)
- [Other Instructions](#other-instructions)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ReX027/MirrAR_Backend_Task.git

   ```

2. **Install dependencies::**

   ```bash
   cd MirrAR_Backend_Task
   npm install
   ```

## Running the Project

1. The server will run on http://localhost:3000 by default.

   ```bash
   npm start
   ```

## Interacting with the API

### Endpoints

The API provides the following endpoints:

1. GET /latest: Retrieve an array of the latest products.

   Request:

   - Method: "GET"
   - URL: /latest

   Response:

   ```bash
   {
    "status": 200,
    "data": [
    {
     "id": "123",
     "name": "Product A",
     "price": 25.99,
     "variants": [...],
     "createdAt": "2022-01-30T12:00:00Z"
    },
    // Additional products...
    ],
    "message": "Products are fetched successfully"
   }

   ```

2. GET /search?query=<search_query>: Search for a specific product by query.

   Request:

   - Method: "GET"
   - URL: /search?query=your_search_query_here

   Response:

   ```bash
   {
    "status": 200,
    "data": [
    {
     "id": "123",
     "name": "Product A",
     "price": 25.99,
     "variants": [...],
     "createdAt": "2022-01-30T12:00:00Z"
    },
    // Additional products...
    ],
    "message": "Products found successfully"
   }

   ```

3. POST /create: Create a new product.

   Request:

   - Method: "POST"
   - URL: /create
   - Body:
     ```bash
     {
      "description": "Product description",
      "name": "Product name",
      "price": 100.0,
      "variants": [
      {
       "name": "Variant name",
       "sku": "Variant SKU",
       "additionalCost": 5.0,
       "stockCount": 10
      }
      ]
     }
     ```

   Response:

   ```bash
   {
    "status": 201,
    "data": {
    "id": "123",
    "description": "Product description",
    "name": "Product name",
    "price": 100.0,
    "variants": [...],
    "createdAt": "2022-01-30T12:00:00Z"
    },
    "message": "Product is added successfully"
   }

   ```

4. PATCH /update/:id: Update an existing product by ID.

   Request:

   - Method: "PATCH"
   - URL: /update/:id
   - Params: id - Product ID
   - Body:
     ```bash
     {
      "description": "Updated description",
      "name": "Updated name",
      "price": 150.0,
      "variants": [
      {
       "name": "Updated variant name",
       "sku": "Updated variant SKU",
       "additionalCost": 7.0,
       "stockCount": 15
      }
     ]
     }
     ```

   Response:

   ```bash:
   {
    "status": 200,
    "data": {
     "id": "123",
     "description": "Updated description",
     "name": "Updated name",
     "price": 150.0,
     "variants": [...],
     "createdAt": "2022-01-30T12:00:00Z"
    },
    "message": "Product updated successfully"
   }

   ```

5. DELETE /delete/:id: Delete a product by ID.

   Request:

   - Method: "DELETE"
   - URL: /delete/:id
   - Params: id - Product ID

   Response:

   ```bash
   {
    "status": 200,
    "data": {
     "id": "123",
     "description": "Product description",
     "name": "Product name",
     "price": 100.0,
     "variants": [...],
    "createdAt": "2022-01-30T12:00:
    }
   }
   ```

Refer to the API documentation or test files for more details on request/response formats.

## Architectural Decisions

This project uses the following technologies:

1. Express: A fast, unopinionated, minimalist web framework for Node.js.
2. Mongoose: An ODM for MongoDB, providing a schema-based solution to model application data.

## Testing

1.  **Run tests using:**

    ```bash
    npm test
    ```

## Other Instructions

Customize the .env file for environment-specific configurations.
Feel free to contribute
