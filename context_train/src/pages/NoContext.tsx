import { useState } from 'react'


import { Header } from '../components/Header';
import AuthContainer from '../components/AuthContainer';
import ThemeContainer from '../components/ThemeContainer';

const  NoContext = ()  => {
  const [user, setUser] = useState("");
  const [theme,setTheme] = useState<'dark' | 'light'>('light');

  const login = () => {
    setUser("Tony");
  }

   const logout = () => {
    setUser("");
  }

  const toggleTheme = () => {
    setTheme((prev)=> prev === 'light' ? "dark" : "light");
  }

  const themeStyles = {
    backgroundColor: theme === 'dark' ? '#333333' : '#fff',
    color: theme === "dark" ? "#fff" : "#333333"
  }
    return (
      <>
        <div style={{...themeStyles}}>
          <Header theme={theme} user={user}></Header>
          <AuthContainer login={login} logout={logout}></AuthContainer>
          <ThemeContainer toggleTheme={toggleTheme}></ThemeContainer>
        </div>
      </>
    )
}

export default NoContext
