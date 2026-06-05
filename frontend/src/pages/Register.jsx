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