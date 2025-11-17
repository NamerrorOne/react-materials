import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Link } from 'react-router';

const heavyFunction = (num:number) : number => {
  
for(let i = 0; i < 999999999; i++) {

}
  return num * 2;
}



function App() {
  const [myNumber, setNumber] = useState<number>(0);
  const [dark, setDark] = useState<boolean>(false);


  const themeStyles = useMemo(()=>({
    backgroundColor: dark?  "#000" : "#fff",
    color: dark ? "#fff" : "#000"
  }), [dark]);

  const doubleNumber = useMemo(() => heavyFunction(myNumber), [myNumber]);


  const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value));
}


useEffect(() => {
  console.log("Changed theme")
},[themeStyles]);

  return (<>
  <Link to="/uscall">Switch to callback</Link>
      <input type="number" value={myNumber} onChange={inputHandler}>

      </input>
      <button onClick={() => setDark((prev) => {return !prev;})}>change theme</button>
      <div style={{...themeStyles}}>{doubleNumber}</div>
  </>)
}

export default App
