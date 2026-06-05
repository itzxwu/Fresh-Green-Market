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
Fresh Green Market
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