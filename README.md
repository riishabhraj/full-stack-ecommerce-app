![image](https://github.com/user-attachments/assets/aab4e882-37b7-44d5-90e1-72ebe2cd45a0)# MYeSTORE 

This is a small application in MVC Strucutre. A seller can add, update products and users can view products, add products to cart.
Project is live at [MYeSTORE](https://full-stack-ecommerce-app-wtkz.onrender.com "MYeSTORE's Homepage")

## Build With

<p>
  <img alt="React" src="https://img.shields.io/badge/React.JS-61DAFB?logo=react&logoColor=000&style=for-the-badge" />
  <img alt="Node.JS" src="https://img.shields.io/badge/Node.JS-393?logo=node.js&logoColor=fff&style=for-the-badge" />
  <img alt="Express.JS" src="https://img.shields.io/badge/Express.JS-f2f0f0?logo=express&logoColor=black&style=for-the-badge" />
  <img alt="HTML" src="https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=for-the-badge" />
  <img alt="Css" src="https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=for-the-badge" />
  <img alt="MongoDB" src="https://img.shields.io/badge/Mongo-888?logo=mongoDB&logoColor=green&style=for-the-badge" />
  <img alt="Mongo-Express" src="https://img.shields.io/badge/Mongo Express-red?logo=mongoDB&logoColor=green&style=for-the-badge" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-f5f5f5?logo=docker&logoColor=blue&style=for-the-badge" />
  <img alt="Material-UI" src="https://img.shields.io/badge/Material-UI-4caf50?style=for-the-badge" />

</p>

There is a ```.env.example``` file where exist all configuration for MongoDB, JWT etc. Change it to .env . Use your specific values or let defaults.

If you want to learn more about application read the [Documentation](#documentation) below

## Getting Started

### Development


1. Clone repository	
    ```bash
	$ git clone https://github.com/riishabhraj/full-stack-ecommerce-app.git
		
	$ cd full-stack-ecommerce-app

	# Remove current origin repo
	$ git remote remove origin  
    ```
2. Start Server (Default PORT - 3000)

    ```bash
    $ cd api
    $ npm install
    $ npm start
    ```

3. Start Client (Default PORT - 5173)

    ```bash
    $ cd client
    $ npm install
    $ npm run dev
    ```

4. Open **http://localhost:5173/** on broswer and select your favourite products.


# Documentation

If you want to make changes or learn how my application works read the documentation below



## Project Structure

```bash
full-stack-ecommerce-app/
├───📁 api/
│   ├───📁 config/
│   │   └───📄 connectDb.js
│   ├───📁 controllers/
│   │   ├───📄 customerController.js
│   │   ├───📄 orderController.js
│   │   ├───📄 productController.js
│   │   └───📄 sellerController.js
│   ├───📁 middlewares/
│   │   ├───📄 errorHandler.js
│   │   └───📄 verifyToken.js
│   ├───📁 models/
│   │   ├───📄 customer.js
│   │   ├───📄 order.js
│   │   ├───📄 product.js
│   │   └───📄 seller.js
│   ├───📁 routes/
│   │   ├───📄 customer.js
│   │   ├───📄 order.js
│   │   ├───📄 product.js
│   │   └───📄 seller.js
│   ├───📁 utils/
│   │   └───📄 constants.js
│   ├───📄 .env.example
│   ├───📄 .gitignore
│   ├───📄 package-lock.json
│   ├───📄 package.json
│   └───📄 server.js
├───📁 client/
│   ├───📁 public/
│   │   └───📄 vite.svg
│   ├───📁 src/
│   │   ├───📁 components/
│   │   │   ├───📁 Seller/
│   │   │   │   ├───📄 AddProduct.jsx
│   │   │   │   ├───📄 Dashboard.jsx
│   │   │   │   ├───📄 EditProduct.jsx
│   │   │   │   ├───📄 Orders.jsx
│   │   │   │   ├───📄 ProductForm.jsx
│   │   │   │   ├───📄 ProductList.jsx
│   │   │   │   ├───📄 Products.jsx
│   │   │   │   ├───📄 Profile.jsx
│   │   │   │   ├───📄 SellerSignIn.jsx
│   │   │   │   └───📄 SellerSignUp.jsx
│   │   │   ├───📄 Avatar.jsx
│   │   │   ├───📄 Banner.jsx
│   │   │   ├───📄 FeaturedCategories.jsx
│   │   │   ├───📄 Footer.jsx
│   │   │   ├───📄 Navbar.jsx
│   │   │   ├───📄 ProductCard.jsx
│   │   │   ├───📄 ProductDetail.jsx
│   │   │   ├───📄 Products.jsx
│   │   │   ├───📄 ProfileDropdown.jsx
│   │   │   └───📄 Search.jsx
│   │   ├───📁 pages/
│   │   │   ├───📄 Cart.jsx
│   │   │   ├───📄 customerProfile.jsx
│   │   │   ├───📄 HomePage.css
│   │   │   ├───📄 HomePage.jsx
│   │   │   ├───📄 MyOrders.jsx
│   │   │   ├───📄 ProductsPage.css
│   │   │   ├───📄 ProductsPage.jsx
│   │   │   ├───📄 SignIn.jsx
│   │   │   └───📄 SignUp.jsx
│   │   ├───📁 redux/
│   │   │   ├───📁 reducers/
│   │   │   │   ├───📄 cartReducer.js
│   │   │   │   ├───📄 customerReducer.js
│   │   │   │   ├───📄 productReducer.js
│   │   │   │   └───📄 sellerReducer.js
│   │   │   └───📄 store.js
│   │   ├───📄 App.jsx
│   │   ├───📄 firebase.js
│   │   ├───📄 index.css
│   │   └───📄 main.jsx
│   ├───📄 .env.example
│   ├───📄 .eslintrc.cjs
│   ├───📄 .gitignore
│   ├───📄 index.html
│   ├───📄 package-lock.json
│   ├───📄 package.json
│   ├───📄 postcss.config.js
│   ├───📄 README.md
│   ├───📄 tailwind.config.js
│   └───📄 vite.config.js
├───📄 .dockerignore
├───📄 .gitignore
├───📄 docker-compose.yaml
├───📄 Dockerfile
├───📄 README.Docker.md
└───📄 README.md

```


## API structure

### Frontend

**Client Service**

Client is the frontend application in which seller/user can  
1. Create Product Listing
2. Display Products
3. Update Products
4. Add Products to Cart

***ENVIRONMENT VARIABLES***

All environment variables exist in `api/.env` file in root folder.

All data store in a [MongoDB](https://www.mongodb.com/) Database in which we use [mongo-express](https://github.com/mongo-express/mongo-express) which is admin interface for MongoDB.

> :warning: **Change Variables**: Be very careful here! Recommend don't change ```Variablies``` in ```.env``` file for development purpose. But you are free to change them.

***API***

## Customer
Action | HTTP request | URI | Purpose
--- | --- | --- | ---
*Register* | `POST` | `/api/customer/auth/signup` | Register User
*SignIn* | `GET` | `/api/customer/auth/signin` | Logging in User 
*SignOut* | `POST` | `/api/customer/auth/signout` | Logging Out User

## Seller
Action | HTTP request | URI | Purpose
--- | --- | --- | ---
*Register* | `POST` | `/api/seller/auth/signup` | Register User
*SignIn* | `GET` | `/api/seller/auth/signin` | Logging in User 
*SignOut* | `POST` | `/api/seller/auth/signout` | Logging Out User

## Product
Action | HTTP request | URI | Purpose
--- | --- | --- | ---
*Get Product* | `POST` | `/api/product/:id` | Get product with `id`
*Get Products* | `GET` | `/api/products` | Get All Products
*Get Seller Products* | `POST` | `/api/products/:id` | Get Seller Products with `seller id` 
*Get Filtered Products* | `POST` | `/api/products/category/:category` | Get Filtered Products
*Create Product* | `GET` | `/api/product/create` | Create Product
*Update Product* | `POST` | `/api/product/update/:id` | Update Product
*Delete Product* | `GET` | `/product/delete/:id` | Delete Product


## Order
Action | HTTP request | URI | Purpose
--- | --- | --- | ---
*ToBeAdded* | `POST` | `/api/order/new` | Get product with `id`
*ToBeAdded* | `GET` | `/api/myorders` | Get All Products
*ToBeAdded* | `POST` | `/api/orders` | Get Seller Products with `seller id` 
*ToBeAdded* | `POST` | `/api/orders/:id` | Get Filtered Products
*ToBeAdded* | `GET` | `/api/orders/update/:id` | Create Product
*ToBeAdded* | `POST` | `/api/orders/delete/:id` | Update Product


# HomePage:
![image](https://github.com/user-attachments/assets/0db16b38-f882-4a16-a310-b7f2e3a3cb52)
![image](https://github.com/user-attachments/assets/88a346dc-44db-40af-b8ae-3ad6ee24503d)

# Product:
![image](https://github.com/user-attachments/assets/ff075758-18c1-4469-9c21-3f98003cca28)

# Registration:
![image](https://github.com/user-attachments/assets/12f70e47-7a77-4cd2-95be-ad119eee3e04)


