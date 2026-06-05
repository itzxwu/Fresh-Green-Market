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