import { createContext,useState
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