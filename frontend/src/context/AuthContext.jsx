import {
createContext,
useState
}
from 'react';

export const AuthContext =
createContext();

function AuthProvider({
children
}) {

const [user,
setUser]
=
useState(

JSON.parse(
localStorage.getItem(
'userInfo'
)
)

);

const logout =
()=>{

localStorage.removeItem(
'userInfo'
);

setUser(null);

};

return (

<AuthContext.Provider
value={{
user,
setUser,
logout
}}
>

{children}

</AuthContext.Provider>

);
}

export default AuthProvider;