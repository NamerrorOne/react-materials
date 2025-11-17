import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';

const AuthComponentContext = () => {
    const setContext =useContext(MyContext)[1];

    const login = () => {
        setContext((prev) => {
            return {...prev, "user": "Arthur"}
        });
    }

    const logout = () => {
        setContext((prev) => {
            return {...prev, "user" : ""}
        })
    }


  return (
    <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AuthComponentContext