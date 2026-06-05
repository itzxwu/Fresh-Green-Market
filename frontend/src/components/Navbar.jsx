import {
Link
}
from 'react-router-dom';
import {
useContext
}
from 'react';

import {
CartContext
}
from '../context/CartContext';



import {
AuthContext
}
from '../context/AuthContext';
function Navbar() {


const {
cart
}
=
useContext(
CartContext
);

const {
user,
logout
}
=
useContext(
AuthContext
);


  return (
    <nav className="bg-green-600 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Fresh Green Market
      </h1>

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

{user.role === "admin" && (
  <Link to="/admin">
    Admin
  </Link>
)}

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
    </nav>
  );
}

export default Navbar;