import { useEffect, useState } from "react";

export const List = ({getItems, data} : {getItems: () => number[], data?:string}) => {
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        setItems(getItems());
        console.log(items);
    }, [getItems])

    return (
        <>
            {items.map((item : number, i : number) => {
                return <div key={i + item + 5}>{item}</div>
            })}
        </>
    )
}