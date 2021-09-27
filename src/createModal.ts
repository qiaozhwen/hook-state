import React,{useState, useEffect} from 'react'
export const createContainer = (initState)=>{
    let globalState = initState
    const listeners = Object.fromEntries(Object.keys(initState).map(key=>[key, new Set()]))
    const setGlobalState = (key, nextValue) => {
        if(typeof nextValue==='function'){
            globalState = { ...globalState, [key]: nextValue(globalState[key]) };
        }else{
            globalState = { ...globalState, [key]: nextValue };
        }
        listeners[key].forEach((listener:any)=> listener())
    }
    const useSetGlobalState = (key)=> {
        const [state, setState] = useState<any>(globalState[key])
        // useEffect(() => {
        //     const listener = () => {
        //         setState(globalState[key]);
        //     };
        //     listeners[key].add(listener);
        //     listener(); // in case it's already changed
        //     return () => listeners[key].delete(listener); // cleanup
        // }, []);
        return [state, (newValue)=>setGlobalState(key, newValue)]
    }
    return {
        setGlobalState,
        useSetGlobalState
    }
}