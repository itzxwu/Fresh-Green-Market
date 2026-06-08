
## Fresh Vegetable MERN Website — Full Build Roadmap

We will build this in **12 steps**:

### Step 1 — Project Setup

Create folders and install tools.

### Step 2 — Backend Setup

Node.js + Express + MongoDB connection.

### Step 3 — Frontend Setup

React + Vite + Tailwind.

### Step 4 — MongoDB Models

User, Product, Cart, Order.

### Step 5 — API Routes

Products, users, cart, orders.

### Step 6 — Authentication

Login/Register + JWT.

### Step 7 — Product System

Show vegetables from database.

### Step 8 — Cart System

Add/remove/update cart.

### Step 9 — Checkout + Orders

Order placement.

### Step 10 — Admin Dashboard

Add/Edit/Delete vegetables.

### Step 11 — Image Upload + Payment

Cloudinary + Razorpay/COD.

### Step 12 — Deployment

Put website online.

---

# STEP 1 — Project Setup (Do This First)

Open **VS Code**.

Open terminal:

```bash
Ctrl + `
```

Create project:

```bash
mkdir fresh-veggie-store
cd fresh-veggie-store
```

Create folders:

```bash
mkdir backend
mkdir frontend
```

You now have:

```text
fresh-veggie-store
│
├── backend
└── frontend
```

---

# STEP 2 — Backend Setup

Go backend:

```bash
cd backend
```

Initialize Node:

```bash
npm init -y
```

Install backend packages:

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer cloudinary
```

Install dev tools:

```bash
npm install nodemon --save-dev
```

Create folders:

### Windows

```bash
mkdir config controllers middleware models routes uploads utils
```

Create files:

### Windows

```bash
type nul > server.js
type nul > .env
type nul > .gitignore
```

Backend now:

```text
backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── uploads
├── utils
├── server.js
├── .env
└── package.json
```

---

# STEP 3 — Setup MongoDB Connection

Inside:

```text
backend/config
```

Create:

```text
db.js
```

Paste:

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `Mongo Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=supersecretkey
```

---

Edit `server.js`

Paste:

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Vegetable API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});
```

---

Open:

```text
backend/package.json
```

Replace scripts with:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run backend:

```bash
npm run dev
```

Expected:

```text
Mongo Connected
Server running on 5000
```

---

# STEP 4 — Frontend Setup

Open new terminal.

Go root:

```bash
cd ..
```

Create React app:

```bash
npm create vite@latest frontend -- --template react
```

Go frontend:

```bash
cd frontend
```

Install:

```bash
npm install
```

Install packages:

```bash
npm install axios react-router-dom
```

Install Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize:

```bash
npx tailwindcss init -p
```

Run frontend:

```bash
npm run dev
```

You should see:

```text
localhost:5173
```

---

# STEP 5 — Create Database Models

Models are MongoDB schemas.

They define how data is stored.

For your website we need:

```text
User
Product
Cart
Order
```

Backend folder:

```text
backend/models
```

Create 4 files:

```text
User.js
Product.js
Cart.js
Order.js
```

---

# 5.1 Create Product Model

This stores vegetables.

Create:

```text
backend/models/Product.js
```

Paste:

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model('Product', productSchema);
```

This stores:

Example:

```text
Tomato
₹40
Vegetable
Stock 25
Image
Description
```

Save.

---

# 5.2 Create User Model

This stores customer account.

Create:

```text
backend/models/User.js
```

Paste:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:'user'
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model('User', userSchema);
```

Roles:

```text
user
admin
```

---

# 5.3 Create Cart Model

Stores shopping cart.

Create:

```text
backend/models/Cart.js
```

Paste:

```javascript
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },

            quantity:{
                type:Number,
                default:1
            }
        }
    ]
},
{
    timestamps:true
}
);

module.exports =
mongoose.model('Cart', cartSchema);
```

Example:

```text
Ameer cart
2 Tomato
1 Potato
```

---

# 5.4 Create Order Model

Stores orders.

Create:

```text
backend/models/Order.js
```

Paste:

```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },

            quantity:Number
        }
    ],

    totalPrice:Number,

    status:{
        type:String,
        default:'Pending'
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model('Order', orderSchema);
```

Order status:

```text
Pending
Processing
Delivered
```

---

# STEP 6 — Create Product API

Now backend can **add and fetch vegetables**.

Create folders if missing:

```text
backend
│
├── controllers
└── routes
```

Create:

```text
controllers/productController.js
routes/productRoutes.js
```

---

## 6.1 Product Controller

Create:

```text
backend/controllers/productController.js
```

Paste:

```javascript
const Product =
require('../models/Product');

exports.getProducts =
async(req,res)=>{
    try{
        const products =
        await Product.find();

        res.json(products);
    }
    catch(error){
        res.status(500)
        .json(error);
    }
};

exports.addProduct =
async(req,res)=>{
    try{
        const product =
        await Product.create(req.body);

        res.json(product);
    }
    catch(error){
        res.status(500)
        .json(error);
    }
};
```

---

## 6.2 Product Routes

Create:

```text
backend/routes/productRoutes.js
```

Paste:

```javascript
const express =
require('express');

const router =
express.Router();

const {
    getProducts,
    addProduct
}
=
require('../controllers/productController');

router.get('/',
getProducts);

router.post('/',
addProduct);

module.exports = router;
```

---

# STEP 7 — Connect Route to Server

Open:

```text
backend/server.js
```

Add:

Top:

```javascript
const productRoutes =
require('./routes/productRoutes');
```

Then below middleware:

```javascript
app.use(
'/api/products',
productRoutes
);
```

Server becomes:

```javascript
app.use(cors());
app.use(express.json());

app.use(
'/api/products',
productRoutes
);
```

Save.

Restart:

```bash
npm run dev
```

---

# STEP 8 — Test API in Browser/Postman

Open:

```text
http://localhost:5000/api/products
```

Expected:

```json
[]
```

 **Step 8 — Add vegetables to MongoDB and test API**.

This means:

```text id="9pc0qs"
Backend → MongoDB → Store vegetables
```

---

# STEP 8 — Add Product API (POST Request)

We already made:

```text id="udj4yn"
GET /api/products
POST /api/products
```

Now we test **adding vegetables**.

You can use:

1. **Postman** (recommended)
   OR
2. VS Code Thunder Client extension

I'll show Postman first.

---

## Step 8.1 Install Postman

Download and install Postman.

Open Postman.

---

## Step 8.2 Create POST Request

Method:

```text id="k63hsf"
POST
```

URL:

```text id="h9ng85"
http://localhost:5000/api/products
```

---

## Step 8.3 Open Body Tab

Choose:

```text id="7cz9di"
Body
→ raw
→ JSON
```

Paste:

```json
{
  "name": "Tomato",
  "price": 40,
  "category": "Vegetable",
  "stock": 50,
  "image": "tomato.jpg",
  "description": "Fresh organic tomato"
}
```

Click:

```text id="m4yupw"
Send
```

---

Expected response:

```json
{
  "_id": "...",
  "name": "Tomato",
  "price": 40,
  "category": "Vegetable",
  "stock": 50,
  "image": "tomato.jpg",
  "description": "Fresh organic tomato"
}
```

That means MongoDB saved it.

---

# STEP 8.4 Test GET API

Browser or Postman:

```text id="r63z0m"
http://localhost:5000/api/products
```

Now instead of:

```json id="wq5v0u"
[]
```

You should see:

```json
[
  {
    "name":"Tomato",
    "price":40,
    "category":"Vegetable"
  }
]
```

---


# STEP 9 — Connect React Frontend to Backend

Goal:

```text id="y78rxy"
MongoDB
   ↓
Backend API
   ↓
React Website
```

Instead of hardcoded data, React will show vegetables from MongoDB.

---

# Step 9.1 — Create Frontend Folder Structure

Go:

```text id="c3k4ka"
frontend/src
```

Create:

```text id="wm0vy1"
components
pages
services
```

Then:

```text id="o2otww"
components/ProductCard.jsx
pages/Home.jsx
services/productService.js
```

Structure:

```text id="7bb57t"
src
│
├── components
│   └── ProductCard.jsx
│
├── pages
│   └── Home.jsx
│
├── services
│   └── productService.js
│
├── App.jsx
└── main.jsx
```

---

# Step 9.2 — Create Axios Service

Open:

```text id="j64rj3"
services/productService.js
```

Paste:

```javascript id="fw3nrn"
import axios from 'axios';

const API =
'http://localhost:5000/api/products';

export const getProducts =
async () => {
    const response =
    await axios.get(API);

    return response.data;
};
```

This file talks to backend.

---

# Step 9.3 — Create Product Card Component

Open:

```text id="3c0ye0"
components/ProductCard.jsx
```

Paste:

```jsx id="opm8v4"
function ProductCard({ product }) {

  return (
    <div
      style={{
        border:'1px solid #ddd',
        padding:'15px',
        margin:'10px',
        width:'220px'
      }}
    >
      <h3>{product.name}</h3>

      <p>
        ₹{product.price}
      </p>

      <p>
        {product.category}
      </p>

      <p>
        Stock:
        {product.stock}
      </p>
    </div>
  );
}

export default ProductCard;
```

This shows one vegetable.

---

# Step 9.4 — Create Home Page

Open:

```text id="x6zhzj"
pages/Home.jsx
```

Paste:

```jsx id="9rkfp6"
import {
useEffect,
useState
}
from 'react';

import ProductCard
from '../components/ProductCard';

import {
getProducts
}
from '../services/productService';

function Home() {

const [products,
setProducts]
=
useState([]);

useEffect(() => {

    const fetchProducts =
    async () => {

        const data =
        await getProducts();

        setProducts(data);
    };

    fetchProducts();

}, []);

return (
<div>

<h1>
Fresh Vegetables
</h1>

<div>

{
products.map(
(product)=>(

<ProductCard
key={product._id}
product={product}
/>

))
}

</div>

</div>
);
}

export default Home;
```

This fetches products from backend.

---

# Step 9.5 — Update App.jsx

Open:

```text id="pqy6s7"
src/App.jsx
```

Replace everything:

```jsx id="f91jfv"
import Home
from './pages/Home';

function App() {
  return <Home />;
}

export default App;
```

---

# Step 9.6 — Run Frontend

Terminal:

```bash id="84r5md"
npm run dev
```

Open:

```text id="lf4xmy"
http://localhost:5173
```

Expected:

```text id="z2zt2q"
Fresh Vegetables

Tomato
₹40
Vegetable
Stock 50
```

 **Step 10 — Build a Real UI with Tailwind + Navbar + Product Grid + Hero Section**.

Right now it looks basic. We'll make it look like an actual vegetable store.

Goal:

```text id="goq4yo"
Navbar
Hero Banner
Product Grid
Better Product Cards
Green Grocery Theme
```

Expected design direction:

![Image](https://images.openai.com/static-rsc-4/yprg2qRWbEd6GpLWMpSE8vDWPWe86qVcAICLwImb9wKH2fZBxULEnnhgXOcYaq9rEzCl-Kp3CEMC0I9EDpQ_U9yjlDFEVn3J0gi0w0ToCpP1o3Kxv7-aRy_GazzTqKnsjDTw4Zb-NSgEoC-EosETy0rOQ0rn8XpBsteQJof8x6nkHBwSd0ZDOJWKt_R6lRw5?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/FfQzhQ87I9pv7KSXbfqSXQEmGPRlUEj64OJvNES92BUOdsIHH5L9Ee6g2Xzk-aei44M-vavawEEVO2LGlnwUw4o_8hpsnJmsUChAuZ8-7X9p4Hh2li7q8NoMw1AlsKxGLBTvWHAhxUSIu6PnEzKcXEUOoFt_is5x2lFw2mxOxXff6t7lVh137HvkJBm8CCsT?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/pOYsBRskyNuFHGIKsnPn0Yq-W59Q_MrQ_S6NvKNzQf_lgWh4lOcaZUPddVMQGfx3Te0tbMiv5aUydWvDeQiKpJc09FGkOqKA1B7OwkKLL4ahHo1t7xK31socAVC7GOSbtZWFbZUk4uCXOnMEb57JPXOX43FE9kk7YuxqIxktdLujyxE8z5yTMHgbE7uGfC0s?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ZLl6fJ6rUmk8lB_Bss2IZ1gpaXHiAIvW9IHthcphQZ5EulS0vsEpLSbHaZQrQbfo-HGiQSZg7ufZGdTroyMgjElNVEeTCVkzzvZcZTTWM8Sb-7Dt_HJQ_tbUen1LbCHHmiu47p61ipQwanWbEvQDGVkW3pU79xKWtUB33kycsn-2iwzLh3ZrP-QB3TGEHUcn?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/d9yhO_2tJVaHPxXF3SDJ_F6-9jfWF-udOxcG0-3bX8ZifQyogJx_N6pBs45yFvlc7cC05S9Dk7c4h3yxjhtmV55GojZ0fZzx9fLcUgLz5I1Gv10R5ugoPl0eQ7fLXqSldcxNW30zWp2bji0YiijRndnz8q7V-9Ww6A5TPtj5dBWIfuv8BaaP7QqIZc0mobKj?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/HQB3SqMBwdjdbQAISu_KmnE4cFKYpFOQdmNdhfom2TpeM1BIn95nVdAFN59c3S5WYx2glx72j2sNL1SK_uFJlkEPwCayZSO2g3eKvh_n-BRinM4QUVIWW6Npy9Fj9NOzowHG2zpGPzQXVRskH2Ng-fA263afAoWnzTvX213X7XzB1o8iK8WncrbXXyYigMmw?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/tZpSkGDvvdLaTXpHCTMM0V4mEjuliOfZ3JT6L6-t0W5aTuboTJaiHMw9syKxEowXNiC5kuGFWjbtow1g8da6GpLntdBK9UGm0d8vBI455JqRh_I-bB-ByHTac6xr3X0_7A1hAkSnP-JiRtYuhuSJmiqxvjMpqL9V0RNpwKSXczm5ebEH_QYUx5XmIc4kuoME?purpose=fullsize)

---

# Step 10.1 — Configure Tailwind

Open:

```text id="ls2jlwm"
frontend/tailwind.config.js
```

Replace with:

```javascript id="h28a1x"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

Open:

```text id="qjlwm6"
src/index.css
```

Delete everything.

Add:

```css id="8y2nd4"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Save.

Restart frontend:

```bash id="t6z5r7"
npm run dev
```

---

# Step 10.2 — Create Navbar

Create:

```text id="b80dfe"
src/components/Navbar.jsx
```

Paste:

```jsx id="d6c0ie"
function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        FreshVeg
      </h1>

      <div className="flex gap-6">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Cart</a>
      </div>
    </nav>
  );
}

export default Navbar;
```

---

# Step 10.3 — Improve Product Card

Open:

```text id="k0jkkt"
ProductCard.jsx
```

Replace:

```jsx id="lhk89q"
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">

      <img
        src="https://via.placeholder.com/200"
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-xl font-bold mt-3">
        {product.name}
      </h3>

      <p className="text-green-600 font-semibold">
        ₹{product.price}
      </p>

      <p className="text-gray-500">
        {product.category}
      </p>

      <p>
        Stock:
        {product.stock}
      </p>

      <button
      className=
      "bg-green-600 text-white px-4 py-2 rounded mt-3 w-full">
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
```

---

# Step 10.4 — Create Hero + Grid

Open:

```text id="2t2j4j"
pages/Home.jsx
```

Replace with:

```jsx id="ajxmv2"
import {
useEffect,
useState
}
from 'react';

import Navbar
from '../components/Navbar';

import ProductCard
from '../components/ProductCard';

import {
getProducts
}
from '../services/productService';

function Home() {

const [products,
setProducts]
=
useState([]);

useEffect(() => {

const fetchProducts =
async () => {

const data =
await getProducts();

setProducts(data);

};

fetchProducts();

}, []);

return (

<div className="bg-gray-100 min-h-screen">

<Navbar />

<div className=
"bg-green-500 text-white py-20 text-center">

<h1 className=
"text-5xl font-bold">
Fresh Vegetables
</h1>

<p className="mt-4 text-lg">
Healthy • Organic • Farm Fresh
</p>

</div>

<div className=
"grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

{
products.map(
(product)=>(

<ProductCard
key={product._id}
product={product}
/>

))
}

</div>

</div>
);
}

export default Home;
```

---

# Step 10.5 — Run Website

Frontend:

```bash id="fx10zq"
npm run dev
```

Open:

```text id="7jxjhm"
localhost:5173
```

# STEP 11 — Add to Cart Functionality

Goal:

```text id="40c69v"
User clicks Add to Cart
        ↓
Item stored in React state
        ↓
Cart page shows products
        ↓
Cart count updates
```

After this, your website becomes an actual shopping site.

---

# Step 11.1 — Create Cart Context

We need global cart state.

Go:

```text id="kt8tkd"
frontend/src
```

Create folder:

```text id="7gzhh5"
context
```

Create:

```text id="j2n6w4"
CartContext.jsx
```

Structure:

```text id="d3r6hn"
src
│
├── context
│   └── CartContext.jsx
```

---

Open:

```text id="svr2l6"
CartContext.jsx
```

Paste:

```jsx id="l7o9cn"
import {
createContext,
useState
}
from 'react';

export const CartContext =
createContext();

function CartProvider({
children
}) {

const [cart,
setCart]
=
useState([]);

const addToCart =
(product)=>{

setCart(
(prev)=>
[...prev, product]
);

};

return (

<CartContext.Provider
value={{
cart,
addToCart
}}
>

{children}

</CartContext.Provider>

);
}

export default CartProvider;
```

This stores cart globally.

---

# Step 11.2 — Wrap App With CartProvider

Open:

```text id="9n1jgn"
src/main.jsx
```

Replace with:

```jsx id="8yvgto"
import React
from 'react';

import ReactDOM
from 'react-dom/client';

import App
from './App';

import './index.css';

import CartProvider
from './context/CartContext';

ReactDOM
.createRoot(
document.getElementById('root')
)
.render(

<CartProvider>

<App />

</CartProvider>

);
```

Now whole website can access cart.

---

# Step 11.3 — Update Product Card

Open:

```text id="n6qzba"
ProductCard.jsx
```

Add imports:

```jsx id="4y7l6q"
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';
```

Inside component:

Add:

```jsx id="ejb6c8"
const {
addToCart
}
=
useContext(
CartContext
);
```

Button becomes:

Replace:

```jsx id="ylr0qr"
<button>
Add to Cart
</button>
```

with:

```jsx id="dpcv52"
<button
onClick={()=>
addToCart(product)
}
className=
"bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>
Add to Cart
</button>
```

Full component now:

```jsx id="lb67qx"
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

function ProductCard({
product
}) {

const {
addToCart
}
=
useContext(
CartContext
);

return (

<div className=
"bg-white rounded-lg shadow-md p-4">

<h3>
{product.name}
</h3>

<p>
₹{product.price}
</p>

<button
onClick={()=>
addToCart(product)
}
className=
"bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Add to Cart

</button>

</div>

);
}

export default ProductCard;
```

---

# Step 11.4 — Create Cart Page

Create:

```text id="fczhfd"
pages/Cart.jsx
```

Paste:

```jsx id="5qpm52"
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

function Cart() {

const {
cart
}
=
useContext(
CartContext
);

return (

<div className="p-8">

<h1
className=
"text-3xl font-bold mb-6"
>

Cart

</h1>

{
cart.map(
(item,index)=>(

<div
key={index}
className=
"border p-4 mb-4"
>

<h3>
{item.name}
</h3>

<p>
₹{item.price}
</p>

</div>

))
}

</div>

);
}

export default Cart;
```

---

# Step 11.5 — Setup Routing

We need page navigation.

Install if not already:

```bash id="nwlct7"
npm install react-router-dom
```

Open:

```text id="43pwsg"
App.jsx
```

Replace:

```jsx id="z2d5f8"
import {
BrowserRouter,
Routes,
Route
}
from 'react-router-dom';

import Home
from './pages/Home';

import Cart
from './pages/Cart';

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home />}
/>

<Route
path="/cart"
element={<Cart />}
/>

</Routes>

</BrowserRouter>

);
}

export default App;
```

---

# Step 11.6 — Update Navbar

Open:

```text id="1dx02q"
Navbar.jsx
```

Import:

```jsx id="54u3mq"
import {
Link
}
from 'react-router-dom';
```

Replace `<a>` with:

```jsx id="wnr7jt"
<Link to="/">
Home
</Link>

<Link to="/cart">
Cart
</Link>
```

Navbar becomes clickable.

---

# Run

Frontend:

```bash id="7f72ik"
npm run dev
```

Test:

1 Click **Add to Cart**
2 Click **Cart**
3 Product should appear

If working:

 Shopping cart created
 React state working
 Multi-page routing working


# STEP 12 — Cart Quantity + Remove Item + Cart Count Badge

Goal:

```text id="gk7jta"
Add item
    ↓
Quantity increases
    ↓
Navbar shows cart count
    ↓
Remove item
    ↓
Total updates
```

After this, your cart becomes much more professional.

---

# Step 12.1 — Upgrade CartContext

Open:

```text id="bgprjh"
src/context/CartContext.jsx
```

Replace everything:

```jsx
import {
createContext,
useState
}
from 'react';

export const CartContext =
createContext();

function CartProvider({
children
}) {

const [cart,
setCart]
=
useState([]);

const addToCart =
(product)=>{

const existing =
cart.find(
item=>
item._id === product._id
);

if(existing){

setCart(
cart.map(
item=>

item._id===product._id
?
{
...item,
qty:item.qty+1
}
:
item
)
);

}
else{

setCart([
...cart,
{
...product,
qty:1
}
]);

}

};

const removeFromCart =
(id)=>{

setCart(
cart.filter(
item=>
item._id!==id
)
);

};

return (

<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart
}}
>

{children}

</CartContext.Provider>

);
}

export default CartProvider;
```

What changed?

* Same product → qty increases
* Remove function added

---

# Step 12.2 — Update Navbar Cart Count

Open:

```text id="8f7b25"
Navbar.jsx
```

Add imports:

```jsx
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';
```

Inside component:

```jsx
const {
cart
}
=
useContext(
CartContext
);
```

Replace Cart link:

```jsx
<Link to="/cart">
Cart
</Link>
```

with:

```jsx
<Link to="/cart">

Cart
(
{cart.length}
)

</Link>
```

Now navbar shows:

```text id="k8z6a7"
Cart (1)
Cart (2)
```

---

# Step 12.3 — Improve Cart Page

Open:

```text id="6pldtt"
pages/Cart.jsx
```

Replace everything:

```jsx
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

function Cart() {

const {
cart,
removeFromCart
}
=
useContext(
CartContext
);

const total =
cart.reduce(
(sum,item)=>

sum +
(item.price*item.qty),

0
);

return (

<div className="p-8">

<h1
className=
"text-3xl font-bold mb-6"
>

Cart

</h1>

{
cart.length===0
?
<p>
Cart Empty
</p>
:
cart.map(
(item)=>(

<div
key={item._id}
className=
"border p-4 mb-4 rounded flex justify-between"
>

<div>

<h3>
{item.name}
</h3>

<p>
₹{item.price}
</p>

<p>
Qty:
{item.qty}
</p>

</div>

<button
onClick={()=>
removeFromCart(
item._id
)
}
className=
"bg-red-500 text-white px-3 py-2 rounded"
>

Remove

</button>

</div>

))
}

<h2
className=
"text-2xl font-bold mt-6"
>

Total:
₹{total}

</h2>

</div>

);
}

export default Cart;
```

---

# Step 12.4 — Test

Run:

```bash
npm run dev
```

Test:

### 1 Add Tomato twice

Expected:

```text id="g29gxr"
Qty: 2
```

### 2 Navbar

Expected:

```text id="rj0dr3"
Cart (1)
```

(1 product type with qty 2)

### 3 Remove

Expected:

```text id="8d8u4z"
Cart Empty
```

---



# STEP 13 — Product Details Page + Dynamic Routing

Right now users only see product cards.

We want:

```text id="bx7flg"
Click product
      ↓
Open product page
      ↓
Large image
Description
Price
Stock
Add to Cart
Buy Now
```

Like a real e-commerce site.

---

# Step 13.1 — Create Product Details Page

Create:

```text id="c9ykwl"
src/pages/ProductDetails.jsx
```

Structure:

```text id="2jkf1v"
pages
│
├── Home.jsx
├── Cart.jsx
└── ProductDetails.jsx
```

---

Open:

```text id="qu6u55"
ProductDetails.jsx
```

Paste:

```jsx
import {
useEffect,
useState,
useContext
}
from 'react';

import {
useParams
}
from 'react-router-dom';

import axios
from 'axios';

import {
CartContext
}
from '../context/CartContext';

function ProductDetails() {

const { id } =
useParams();

const [product,
setProduct]
=
useState(null);

const {
addToCart
}
=
useContext(
CartContext
);

useEffect(()=>{

const fetchProduct =
async()=>{

const res =
await axios.get(
`http://localhost:5000/api/products/${id}`
);

setProduct(
res.data
);

};

fetchProduct();

},[id]);

if(!product)
return <p>Loading...</p>;

return (

<div className=
"p-8 max-w-5xl mx-auto">

<div className=
"grid md:grid-cols-2 gap-8 bg-white p-6 rounded shadow">

<img
src="https://via.placeholder.com/400"
alt={product.name}
className=
"w-full rounded"
/>

<div>

<h1
className=
"text-4xl font-bold"
>

{product.name}

</h1>

<p
className=
"text-green-600 text-2xl mt-3"
>

₹{product.price}

</p>

<p
className=
"mt-4 text-gray-600"
>

{product.description}

</p>

<p
className=
"mt-3"
>

Stock:
{product.stock}

</p>

<button
onClick={()=>
addToCart(product)
}
className=
"bg-green-600 text-white px-6 py-3 rounded mt-6"
>

Add To Cart

</button>

</div>

</div>

</div>

);
}

export default ProductDetails;
```

This page loads one product using ID.

---

# Step 13.2 — Backend Route for Single Product

Current backend only has:

```text id="0r8onf"
GET all products
```

Need:

```text id="q4nf3h"
GET one product
```

Open:

```text id="ajbyl4"
backend/controllers/productController.js
```

Add below existing code:

```javascript
exports.getSingleProduct =
async(req,res)=>{

try{

const product =
await Product.findById(
req.params.id
);

res.json(product);

}
catch(error){

res.status(500)
.json(error);

}

};
```

---

Open:

```text id="cmmg63"
backend/routes/productRoutes.js
```

Import:

Replace:

```javascript
const {
getProducts,
addProduct
}
```

with:

```javascript
const {
getProducts,
addProduct,
getSingleProduct
}
```

Then add:

```javascript
router.get(
'/:id',
getSingleProduct
);
```

Routes become:

```javascript
router.get('/',
getProducts);

router.get(
'/:id',
getSingleProduct
);

router.post('/',
addProduct);
```

Restart backend:

```bash id="7h0wt4"
npm run dev
```

---

# Step 13.3 — Update ProductCard

Open:

```text id="f39h5q"
ProductCard.jsx
```

Add:

```jsx
import {
Link
}
from 'react-router-dom';
```

Wrap card:

Replace:

```jsx
<div className="...">
```

with:

```jsx
<Link
to={`/product/${product._id}`}
>

<div className=
"bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
```

Close:

Before return ends:

```jsx
</div>
</Link>
```

Now clicking card opens details.

---

# Step 13.4 — Add Route

Open:

```text id="22j6ll"
App.jsx
```

Import:

```jsx
import ProductDetails
from './pages/ProductDetails';
```

Add route:

```jsx
<Route
path="/product/:id"
element={
<ProductDetails />
}
/>
```

App routes:

```jsx
/
 /cart
 /product/:id
```

---

# Step 13.5 — Test

Run frontend + backend.

Click:

```text id="6d0l0h"
Tomato card
```

Expected:

```text id="jlwm0u"
Large product page
Price
Description
Stock
Add to Cart
```


Open:

```text
frontend/src/components/ProductCard.jsx
```

You probably currently have:

```jsx
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

function ProductCard({
product
}) {

const {
addToCart
}
=
useContext(
CartContext
);

return (

<div className=
"bg-white rounded-lg shadow-md p-4">

<h3>
{product.name}
</h3>

<p>
₹{product.price}
</p>

<button
onClick={()=>
addToCart(product)
}
className=
"bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Add to Cart

</button>

</div>

);
}

export default ProductCard;
```

Now do these changes.

---

# Step 13.3A — Add Link Import

At the top add:

```jsx
import {
Link
}
from 'react-router-dom';
```

Top becomes:

```jsx
import {
useContext
}
from 'react';

import {
Link
}
from 'react-router-dom';

import {
CartContext
}
from '../context/CartContext';
```

---

# Step 13.3B — Replace the Outer `<div>`

Currently return starts with:

```jsx
return (

<div className=
"bg-white rounded-lg shadow-md p-4">
```

Replace it with:

```jsx
return (

<Link
to={`/product/${product._id}`}
>

<div className=
"bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
```

We added:

```jsx
<Link to={`/product/${product._id}`}>
```

This makes card clickable.

---

# Step 13.3C — Close Link

At the bottom you currently have:

```jsx
</div>

);
```

Replace with:

```jsx
</div>

</Link>

);
```

---

# Final ProductCard.jsx

Your whole file should look like this:

```jsx
import {
useContext
}
from 'react';

import {
Link
}
from 'react-router-dom';

import {
CartContext
}
from '../context/CartContext';

function ProductCard({
product
}) {

const {
addToCart
}
=
useContext(
CartContext
);

return (

<Link
to={`/product/${product._id}`}
>

<div className=
"bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">

<h3>
{product.name}
</h3>

<p>
₹{product.price}
</p>

<button
onClick={(e)=>{

e.preventDefault();
addToCart(product);

}}
className=
"bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Add to Cart

</button>

</div>

</Link>

);
}

export default ProductCard;
```

Important:

We added:

```jsx
e.preventDefault()
```

Otherwise clicking **Add to Cart** would also open the product page.

Now:

* Click card → opens details page
* Click Add to Cart → stays on home and adds item



# STEP 14 — Real Product Images + Checkout Page + Buy Now Flow

Goal:

```text id="4u8ecj"
Product image
      ↓
Add to cart
      ↓
Checkout page
      ↓
Order summary
      ↓
Place Order
```

After this, users can simulate buying vegetables.

---

# PART 1 — Real Product Images

Right now we use:

```text id="v4k67h"
placeholder image
```

We will use the image field from MongoDB.

---

## Step 14.1 — Add Real Image URL to MongoDB

Open Thunder Client.

POST:

```text id="ot3dx5"
http://localhost:5000/api/products
```

Example:

```json id="z1jwju"
{
  "name": "Carrot",
  "price": 60,
  "category": "Vegetable",
  "stock": 30,
  "image": "https://images.unsplash.com/photo-1447175008436-1701707f3f0c",
  "description": "Fresh organic carrot"
}
```

Add few vegetables:

### Potato

```json id="aowmzd"
{
  "name":"Potato",
  "price":50,
  "category":"Vegetable",
  "stock":25,
  "image":"https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  "description":"Farm fresh potato"
}
```

### Onion

```json id="a6k2ut"
{
  "name":"Onion",
  "price":45,
  "category":"Vegetable",
  "stock":40,
  "image":"https://images.unsplash.com/photo-1508747703725-719777637510",
  "description":"Fresh onion"
}
```

---

## Step 14.2 — Update ProductCard Image

Open:

```text id="p1a6qj"
ProductCard.jsx
```

Find:

```jsx id="j8kqzw"
src="https://via.placeholder.com/200"
```

Replace:

```jsx id="h0ls0r"
src={product.image}
```

Image becomes:

```jsx id="iij5xr"
<img
src={product.image}
alt={product.name}
className=
"w-full h-40 object-cover rounded"
/>
```

---

## Step 14.3 — Update ProductDetails Image

Open:

```text id="0a0t1j"
ProductDetails.jsx
```

Find:

```jsx id="l4hcb2"
src="https://via.placeholder.com/400"
```

Replace:

```jsx id="7w7ee5"
src={product.image}
```

Now:

```jsx id="gk80fd"
<img
src={product.image}
alt={product.name}
className=
"w-full rounded"
/>
```

Run:

```bash id="utn9tq"
npm run dev
```

Now vegetables show real photos.

---

# PART 2 — Checkout Page

Now we build buying flow.

Create:

```text id="q24nt9"
pages/Checkout.jsx
```

---

Open:

```text id="ptmy9t"
Checkout.jsx
```

Paste:

```jsx id="pxvr97"
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

function Checkout() {

const {
cart
}
=
useContext(
CartContext
);

const total =
cart.reduce(
(sum,item)=>

sum +
(item.price*item.qty),

0
);

return (

<div className=
"p-8 max-w-4xl mx-auto">

<h1
className=
"text-3xl font-bold mb-6"
>

Checkout

</h1>

<div className=
"bg-white shadow rounded p-6">

{
cart.map(
(item)=>(

<div
key={item._id}
className=
"flex justify-between border-b py-3"
>

<p>
{item.name}
x
{item.qty}
</p>

<p>
₹
{item.price*item.qty}
</p>

</div>

))
}

<h2
className=
"text-2xl font-bold mt-6"
>

Total:
₹{total}

</h2>

<button
className=
"bg-green-600 text-white px-6 py-3 rounded mt-6 w-full"
>

Place Order

</button>

</div>

</div>

);
}

export default Checkout;
```

---

# Step 14.4 — Add Checkout Route

Open:

```text id="5o4cb9"
App.jsx
```

Import:

```jsx id="9czp6l"
import Checkout
from './pages/Checkout';
```

Add:

```jsx id="h3c8ca"
<Route
path="/checkout"
element={
<Checkout/>
}
/>
```

---

# Step 14.5 — Cart → Checkout Button

Open:

```text id="msbzh7"
Cart.jsx
```

Import:

```jsx id="ntvbtg"
import {
Link
}
from 'react-router-dom';
```

Below total:

Add:

```jsx id="7g4t3c"
<Link
to="/checkout"
>

<button
className=
"bg-green-600 text-white px-6 py-3 rounded mt-4"
>

Checkout

</button>

</Link>
```

---

# Test

Flow:

1 Add vegetables
2 Open cart
3 Click checkout

Expected:

```text id="l2aqkw"
Checkout page
Order summary
Total
Place Order button
```

# STEP 15 — Save Orders to MongoDB + Order History

Goal:

```text id="iqqmql"
Checkout
   ↓
Place Order
   ↓
Order saved in MongoDB
   ↓
Show success message
   ↓
Order history page
```

After this, your store becomes database-driven.

---

# PART 1 — Backend Order API

We already created:

```text id="a0zptl"
models/Order.js
```

Now create API.

---

## Step 15.1 — Create Order Controller

Create:

```text id="v9gxyc"
backend/controllers/orderController.js
```

Paste:

```javascript id="j2fj6f"
const Order =
require('../models/Order');

exports.createOrder =
async(req,res)=>{

try{

const order =
await Order.create(
req.body
);

res.status(201)
.json(order);

}
catch(error){

res.status(500)
.json(error);

}

};

exports.getOrders =
async(req,res)=>{

try{

const orders =
await Order.find();

res.json(
orders
);

}
catch(error){

res.status(500)
.json(error);

}

};
```

---

## Step 15.2 — Create Order Routes

Create:

```text id="0mp3fr"
backend/routes/orderRoutes.js
```

Paste:

```javascript id="l6o66x"
const express =
require('express');

const router =
express.Router();

const {
createOrder,
getOrders
}
=
require(
'../controllers/orderController'
);

router.post(
'/',
createOrder
);

router.get(
'/',
getOrders
);

module.exports =
router;
```

---

## Step 15.3 — Connect Orders in Server

Open:

```text id="lct7rn"
backend/server.js
```

Add import:

```javascript id="z31wjv"
const orderRoutes =
require('./routes/orderRoutes');
```

Below products:

```javascript id="8fw97o"
app.use(
'/api/orders',
orderRoutes
);
```

Server:

```javascript id="6gjlwm"
app.use(
'/api/products',
productRoutes
);

app.use(
'/api/orders',
orderRoutes
);
```

Restart:

```bash id="q5pklc"
npm run dev
```

---

# PART 2 — Checkout Saves Order

Open:

```text id="e4ow0l"
Checkout.jsx
```

Add imports:

```jsx id="qjlwmu"
import axios
from 'axios';

import {
useNavigate
}
from 'react-router-dom';
```

Inside component:

Add:

```jsx id="8jwmlv"
const navigate =
useNavigate();
```

---

Create function above return:

```jsx id="w7pkp0"
const placeOrder =
async()=>{

const total =
cart.reduce(
(sum,item)=>

sum +
(item.price*item.qty),

0
);

const orderData = {

products:
cart.map(
item=>({

product:
item._id,

quantity:
item.qty

})
),

totalPrice:
total

};

await axios.post(
'http://localhost:5000/api/orders',
orderData
);

alert(
'Order Placed!'
);

navigate(
'/orders'
);

};
```

---

Replace button:

Current:

```jsx id="24m8od"
<button>
Place Order
</button>
```

Replace:

```jsx id="27qs6u"
<button
onClick={
placeOrder
}
className=
"bg-green-600 text-white px-6 py-3 rounded mt-6 w-full"
>

Place Order

</button>
```

---

# PART 3 — Order History Page

Create:

```text id="wgc0s9"
pages/Orders.jsx
```

Paste:

```jsx id="a95vgm"
import {
useEffect,
useState
}
from 'react';

import axios
from 'axios';

function Orders() {

const [orders,
setOrders]
=
useState([]);

useEffect(()=>{

const fetchOrders =
async()=>{

const res =
await axios.get(
'http://localhost:5000/api/orders'
);

setOrders(
res.data
);

};

fetchOrders();

},[]);

return (

<div className=
"p-8">

<h1
className=
"text-3xl font-bold mb-6"
>

Orders

</h1>

{
orders.map(
(order)=>(

<div
key={order._id}
className=
"border p-4 mb-4 rounded"
>

<p>
Order ID:
{order._id}
</p>

<p>
Total:
₹
{order.totalPrice}
</p>

<p>
Status:
{order.status}
</p>

</div>

))
}

</div>

);
}

export default Orders;
```

---

# Step 15.4 — Add Orders Route

Open:

```text id="muq8n8"
App.jsx
```

Import:

```jsx id="r4wrm0"
import Orders
from './pages/Orders';
```

Add:

```jsx id="t4czx8"
<Route
path="/orders"
element={<Orders/>}
/>
```

Routes:

```text id="p57rbc"
/
cart
checkout
orders
product/:id
```

---

# Test

Flow:

1 Add vegetables
2 Cart
3 Checkout
4 Place Order

Expected:

```text id="6ujjbg"
Order Placed!
```

Then:

```text id="tq2quu"
/orders
```

Shows:

```text id="p5ndj0"
Order ID
Total
Status Pending
```

# STEP 16 — User Register + Login + JWT Authentication

Goal:

```text id="5r4g5i"
Register
   ↓
Login
   ↓
JWT token
   ↓
Protected user session
   ↓
Admin / User system
```

This makes the site multi-user.

---

# PART 1 — Backend Auth API

We already created:

```text id="z6ntlt"
models/User.js
```

Now build auth.

Create:

```text id="34z35n"
backend/controllers/userController.js
backend/routes/userRoutes.js
```

---

## Step 16.1 — User Controller

Open:

```text id="vtxd54"
userController.js
```

Paste:

```javascript id="v13cxk"
const User =
require('../models/User');

const bcrypt =
require('bcryptjs');

const jwt =
require('jsonwebtoken');

exports.registerUser =
async(req,res)=>{

try{

const {
name,
email,
password
}
=
req.body;

const userExists =
await User.findOne({
email
});

if(userExists){

return res
.status(400)
.json({
message:
'User exists'
});

}

const hashedPassword =
await bcrypt.hash(
password,
10
);

const user =
await User.create({

name,
email,
password:
hashedPassword

});

res.status(201)
.json(user);

}
catch(error){

res.status(500)
.json(error);

}

};

exports.loginUser =
async(req,res)=>{

try{

const {
email,
password
}
=
req.body;

const user =
await User.findOne({
email
});

if(
user &&
await bcrypt.compare(
password,
user.password
)
){

const token =
jwt.sign(
{
id:user._id
},
process.env.JWT_SECRET,
{
expiresIn:'7d'
}
);

res.json({

_id:user._id,
name:user.name,
email:user.email,
token

});

}
else{

res
.status(401)
.json({
message:
'Invalid credentials'
});

}

}
catch(error){

res.status(500)
.json(error);

}

};
```

---

## Step 16.2 — User Routes

Open:

```text id="gf14mh"
userRoutes.js
```

Paste:

```javascript id="w0i7dl"
const express =
require('express');

const router =
express.Router();

const {
registerUser,
loginUser
}
=
require(
'../controllers/userController'
);

router.post(
'/register',
registerUser
);

router.post(
'/login',
loginUser
);

module.exports =
router;
```

---

## Step 16.3 — Connect Routes

Open:

```text id="4j2vr7"
server.js
```

Import:

```javascript id="9x0ifv"
const userRoutes =
require('./routes/userRoutes');
```

Add:

```javascript id="ebjoh3"
app.use(
'/api/users',
userRoutes
);
```

Server middleware:

```javascript id="kdrh2n"
app.use(
'/api/products',
productRoutes
);

app.use(
'/api/orders',
orderRoutes
);

app.use(
'/api/users',
userRoutes
);
```

Restart:

```bash id="4clwbk"
npm run dev
```

---

# PART 2 — Test Auth API in Thunder Client

## Register

POST:

```text id="2s2fbh"
http://localhost:5000/api/users/register
```

JSON:

```json id="p3s88r"
{
"name":"Ameer",
"email":"ameer@gmail.com",
"password":"123456"
}
```

Expected:

```json id="h48qtk"
{
"_id":"...",
"name":"Ameer"
}
```

---

## Login

POST:

```text id="u3g2mp"
http://localhost:5000/api/users/login
```

JSON:

```json id="vwevk0"
{
"email":"ameer@gmail.com",
"password":"123456"
}
```

Expected:

```json id="ym4xok"
{
"name":"Ameer",
"token":"JWT..."
}
```

JWT token means auth works.

---

# PART 3 — Frontend Login/Register

Create pages:

```text id="4t0dt6"
Login.jsx
Register.jsx
```

Inside:

```text id="kgl35z"
src/pages
```

---

## Register.jsx

Paste:

```jsx id="ibshne"
function Register() {
return (
<div className="p-8">
<h1 className="text-3xl">
Register
</h1>
</div>
);
}

export default Register;
```

---

## Login.jsx

Paste:

```jsx id="tb1qql"
function Login() {
return (
<div className="p-8">
<h1 className="text-3xl">
Login
</h1>
</div>
);
}

export default Login;
```

---

Add routes in App.jsx:

```jsx id="f8szhw"
<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>
```

Test:

```text id="u8jlwm"
/login
/register
```

# STEP 17 — Real Register + Login + Save JWT Token

Goal:

```text id="6l39es"
Register form
     ↓
MongoDB user created
     ↓
Login form
     ↓
JWT token saved
     ↓
User session works
```

---

# PART 1 — Register Form

Open:

```text id="n6l5cn"
src/pages/Register.jsx
```

Replace everything:

```jsx id="yg1v9w"
import {
useState
}
from 'react';

import axios
from 'axios';

import {
useNavigate
}
from 'react-router-dom';

function Register() {

const navigate =
useNavigate();

const [form,
setForm]
=
useState({

name:'',
email:'',
password:''

});

const handleChange =
(e)=>{

setForm({

...form,
[e.target.name]:
e.target.value

});

};

const handleSubmit =
async(e)=>{

e.preventDefault();

await axios.post(
'http://localhost:5000/api/users/register',
form
);

alert(
'Registration Successful'
);

navigate(
'/login'
);

};

return (

<div className=
"max-w-md mx-auto p-8">

<h1
className=
"text-3xl font-bold mb-6"
>

Register

</h1>

<form
onSubmit={
handleSubmit
}
className=
"space-y-4"
>

<input
type="text"
name="name"
placeholder="Name"
onChange={
handleChange
}
className=
"border w-full p-3 rounded"
/>

<input
type="email"
name="email"
placeholder="Email"
onChange={
handleChange
}
className=
"border w-full p-3 rounded"
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={
handleChange
}
className=
"border w-full p-3 rounded"
/>

<button
className=
"bg-green-600 text-white px-4 py-3 rounded w-full"
>

Register

</button>

</form>

</div>

);
}

export default Register;
```

---

# PART 2 — Login Form

Open:

```text id="8zvpx4"
Login.jsx
```

Replace:

```jsx id="5f1f1u"
import {
useState
}
from 'react';

import axios
from 'axios';

import {
useNavigate
}
from 'react-router-dom';

function Login() {

const navigate =
useNavigate();

const [form,
setForm]
=
useState({

email:'',
password:''

});

const handleChange =
(e)=>{

setForm({

...form,
[e.target.name]:
e.target.value

});

};

const handleSubmit =
async(e)=>{

e.preventDefault();

const res =
await axios.post(
'http://localhost:5000/api/users/login',
form
);

localStorage.setItem(
'userInfo',
JSON.stringify(
res.data
)
);

alert(
'Login Successful'
);

navigate('/');

};

return (

<div className=
"max-w-md mx-auto p-8">

<h1
className=
"text-3xl font-bold mb-6"
>

Login

</h1>

<form
onSubmit={
handleSubmit
}
className=
"space-y-4"
>

<input
type="email"
name="email"
placeholder="Email"
onChange={
handleChange
}
className=
"border w-full p-3 rounded"
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={
handleChange
}
className=
"border w-full p-3 rounded"
/>

<button
className=
"bg-green-600 text-white px-4 py-3 rounded w-full"
>

Login

</button>

</form>

</div>

);
}

export default Login;
```

---

# PART 3 — Test Register

Browser:

```text id="c3slf5"
/register
```

Fill:

```text id="yjlwm1"
Name
Email
Password
```

Click:

```text id="jlwmc4"
Register
```

Expected:

```text id="o2lfg8"
Registration Successful
```

Then redirects:

```text id="bbjlwm"
/login
```

---

# PART 4 — Test Login

Login.

Expected:

```text id="rvr5jx"
Login Successful
```

Then:

```text id="2rjlwm"
Home page
```

JWT token saved.

Check browser:

```text id="jlwmf2"
F12
→ Application
→ Local Storage
```

See:

```text id="jlwmh8"
userInfo
```

# STEP 18 — Logout + Protected Routes + Login Status Navbar

Goal:

```text id="l3g2v1"
Login
   ↓
Navbar shows user
   ↓
Protected pages
   ↓
Logout
   ↓
Session cleared
```

After this, only logged-in users can access orders and checkout.

---

# PART 1 — Create Auth Context

We need global login state.

Create folder if missing:

```text id="k8t4dw"
src/context
```

Create:

```text id="g2s0zd"
AuthContext.jsx
```

---

Open:

```text id="l77u0v"
AuthContext.jsx
```

Paste:

```jsx id="9r7f7r"
import {
createContext,
useState
}
from 'react';

export const AuthContext =
createContext();

function AuthProvider({
children
}) {

const [user,
setUser]
=
useState(

JSON.parse(
localStorage.getItem(
'userInfo'
)
)

);

const logout =
()=>{

localStorage.removeItem(
'userInfo'
);

setUser(null);

};

return (

<AuthContext.Provider
value={{
user,
setUser,
logout
}}
>

{children}

</AuthContext.Provider>

);
}

export default AuthProvider;
```

This manages login globally.

---

# PART 2 — Wrap App

Open:

```text id="7qrb2r"
main.jsx
```

Add import:

```jsx id="h4l2l6"
import AuthProvider
from './context/AuthContext';
```

Wrap app.

Current:

```jsx id="4t9u6v"
<CartProvider>

<App />

</CartProvider>
```

Replace:

```jsx id="u8a3yy"
<AuthProvider>

<CartProvider>

<App />

</CartProvider>

</AuthProvider>
```

Final:

```jsx id="7gsl3n"
<AuthProvider>

<CartProvider>

<App />

</CartProvider>

</AuthProvider>
```

---

# PART 3 — Navbar Login Status + Logout

Open:

```text id="h57g3v"
Navbar.jsx
```

Add imports:

```jsx id="2hj9v2"
import {
useContext
}
from 'react';

import {
AuthContext
}
from '../context/AuthContext';
```

Inside component:

Add:

```jsx id="w48x2q"
const {
user,
logout
}
=
useContext(
AuthContext
);
```

Now replace navbar links section.

Find:

```jsx id="scz0c0"
<div className="flex gap-6">
```

Replace whole block with:

```jsx id="45r7mb"
<div className="flex gap-6">

<Link to="/">
Home
</Link>

<Link to="/cart">
Cart
(
{cart.length}
)
</Link>

{
user
?
<>

<span>
{user.name}
</span>

<button
onClick={
logout
}
>

Logout

</button>

</>
:
<>

<Link to="/login">
Login
</Link>

<Link to="/register">
Register
</Link>

</>
}

</div>
```

Now navbar reacts to login.

---

# PART 4 — Protected Route Component

Create:

```text id="jlwm7a"
src/components/ProtectedRoute.jsx
```

Paste:

```jsx id="jlwm9z"
import {
useContext
}
from 'react';

import {
Navigate
}
from 'react-router-dom';

import {
AuthContext
}
from '../context/AuthContext';

function ProtectedRoute({
children
}) {

const {
user
}
=
useContext(
AuthContext
);

return user
?
children
:
<Navigate
to="/login"
/>;

}

export default ProtectedRoute;
```

---

# PART 5 — Protect Checkout + Orders

Open:

```text id="jlwmdf"
App.jsx
```

Import:

```jsx id="jlwmfz"
import ProtectedRoute
from './components/ProtectedRoute';
```

Replace:

Checkout:

```jsx id="jlwmh4"
<Route
path="/checkout"
element={
<Checkout/>
}
/>
```

with:

```jsx id="jlv2e7"
<Route
path="/checkout"
element={
<ProtectedRoute>
<Checkout/>
</ProtectedRoute>
}
/>
```

Orders:

Replace:

```jsx id="jlwmj8"
<Route
path="/orders"
element={<Orders/>}
/>
```

with:

```jsx id="jlwmkg"
<Route
path="/orders"
element={
<ProtectedRoute>
<Orders/>
</ProtectedRoute>
}
/>
```

---

# Test

### Logged Out

Try:

```text id="jlwmm5"
/checkout
/orders
```

Expected:

```text id="jlwmnz"
redirect → /login
```

### Logged In

Expected:

```text id="jlwmq1"
access granted
```

### Navbar

Logged in:

```text id="jlwms0"
Ameer Logout
```

Logged out:

```text id="jlwmt8"
Login Register
```

