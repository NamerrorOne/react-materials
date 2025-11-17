
import LayoutContext from "../components/LayoutContext";

import { MyContextProvider } from "../context/MyContext";



const ContextExample = () => {
    return (
        <>
            <MyContextProvider>
                <LayoutContext></LayoutContext>
            </MyContextProvider>
        </>
    )
}

export default ContextExample;