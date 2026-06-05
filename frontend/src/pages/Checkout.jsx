import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';

import axios
from 'axios';

import {
useNavigate
}
from 'react-router-dom';



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

const navigate =
useNavigate();

const placeOrder =
async()=>{

const total =
cart.reduce(
(sum,item)=>

sum +
(item.price*item.qty),

0
);

const user = JSON.parse(localStorage.getItem("userInfo"));

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
  orderData,
  {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
);

alert(
'Order Placed!'
);

navigate(
'/orders'
);

};

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
onClick={
placeOrder
}
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