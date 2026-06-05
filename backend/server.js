const userRoutes =
require('./routes/userRoutes');
const orderRoutes =
require('./routes/orderRoutes');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

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

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Vegetable API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});