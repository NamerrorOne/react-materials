import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { HeaderContext } from './HeaderContext';
import AuthContainerContext from './AuthContainerContext';
import ThemeComponentContext from './ThemeComponentContext';

const LayoutContext = () => {
    const context = useContext(MyContext)[0];
    const themeStyles = {
        backgroundColor: context.theme === "dark" ? "#333333" : "#fff",
        color: context.theme === "dark" ? "#fff" : "#333333",
    }
  return (
    <div style={{...themeStyles}}>
        <HeaderContext></HeaderContext>
        <AuthContainerContext></AuthContainerContext>
        <ThemeComponentContext></ThemeComponentContext>
    </div>
  )
}

export default LayoutContext