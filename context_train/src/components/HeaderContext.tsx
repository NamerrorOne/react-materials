import React, { useContext } from 'react'
import { Container } from './Container'
import { MyContext } from '../context/MyContext';

export const HeaderContext = () => {
    const context = useContext(MyContext)[0];
  return (
    <Container>
        Current user : {context.user || "unathorized"}
        <br></br>
        Current theme: {context.theme || ""}
    </Container>
  )
}
