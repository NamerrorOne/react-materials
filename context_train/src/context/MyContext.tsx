import { createContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

export const MyContext = createContext<[{user: string, theme:string}, Dispatch<SetStateAction<{user: string, theme:string}>>]>(undefined);

export const MyContextProvider = ({children} : PropsWithChildren) => {
    return (
        <MyContext.Provider value={useState({user:"", theme: "light"})}>
            {children}
        </MyContext.Provider>
    )
}
