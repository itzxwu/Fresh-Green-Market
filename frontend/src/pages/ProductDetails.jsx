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
src={product.image}
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