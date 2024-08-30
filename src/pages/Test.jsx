import {useEffect, useState} from "react";
import {Button} from "@mui/material";

export default function Test() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('Count: ', count);

        return () => {
            console.log('Inside function: ', count)
        }
    }, [count]);
    return (
        <>
            <Button onClick={() => setCount(prevState => prevState + 1)}>Increment</Button>
            <Button onClick={() => setCount(prevState => prevState - 1)}>Decrement</Button>
            <h1>{count}</h1>
        </>
    )
}
