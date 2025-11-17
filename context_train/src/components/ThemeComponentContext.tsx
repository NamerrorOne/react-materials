import React, { type Dispatch, useContext,  type SetStateAction } from 'react'
import { MyContext } from '../context/MyContext'

const ThemeComponentContext = () => {
    const setContext = useContext< [ {user:string,theme:string}, Dispatch<SetStateAction<{user:string, theme: string}>> ] >(MyContext)[1];

    const toggleTheme = () => {
        setContext((prev)=> {
            return {
                ...prev,
                "theme" : prev.theme === "light" ? "dark" : "light"
            }
        })
    }
  return (
    <div>
        <button onClick={toggleTheme}>Change theme!</button>
    </div>
  )
}

export default ThemeComponentContext