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