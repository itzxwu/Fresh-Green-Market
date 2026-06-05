import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

import {
Link
}
from 'react-router-dom';
function ProductCard({ product }) {
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

     <img
src={product.image}
alt={product.name}
className=
"w-full h-40 object-cover rounded"
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