import { createContext, useState } from "react";



export let CounterContext = createContext ();
 
export default function CounterContextProvider (props){

    const[counter,setCounter] = useState ()
    return <CounterContext.Provider value={{counter}} >
     {props.children}

    </CounterContext.Provider>
}