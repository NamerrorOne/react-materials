import { useCallback, useState } from "react";
import { Link } from "react-router"
import { List } from "./getItems";

export const UseCallbackExample = () => {

     const [myNumber, setNumber] = useState<number>(0);
      const [dark, setDark] = useState<boolean>(false);

      const getItems : () => number[] = useCallback(() => {
          return [myNumber, myNumber + 1, myNumber + 2];
      }, [myNumber]);



      

      const themeStyles = {
          backgroundColor: dark?  "#000" : "#fff",
          color: dark ? "#fff" : "#000"
        };

          const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
                 setNumber(parseInt(e.target.value));
        }
      

    return (
        <>
            <Link to="/"></Link>
             <input type="number" value={myNumber} onChange={inputHandler}>

            </input>
            <button onClick={() => setDark((prev) => {return !prev;})}>change theme</button>
            <div style={{...themeStyles}}>
                      <List getItems={getItems}></List>
            </div>
      
        </>
    )
}