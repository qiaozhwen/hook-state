import {useState, useEffect} from 'react'
type initStateType = {
  [index: string]: any
}
type listenerType = {
  [index: string]: any
}
interface setGlobalState<T> {
  (key: string) : [initStateType, any];
}
export function createContainer<T>(initState: initStateType){
    let globalState = initState
    const listeners:listenerType = Object.keys(initState).map(key=>{
        let a = {}
        a[key] = new Set()
        return a
    })
    const setGlobalState = <T> (key, nextValue) => {
        if(typeof nextValue==='function'){
            globalState = { ...globalState, [key]: nextValue(globalState[key]) };
        }else{
            globalState = { ...globalState, [key]: nextValue };
        }
        for(let listener of listeners[key]){
            listener()
        }
    }
    const useSetGlobalState:setGlobalState<T> = (key)=> {
        const [state, setState] = useState<any>(globalState[key])
        useEffect(() => {
            const listener = () => {
                setState(globalState[key]);
            };
            listeners[key].add(listener);
            listener(); // in case it's already changed
            return () => listeners[key].delete(listener); // cleanup
        }, []);
        return [state, (newValue)=>setGlobalState(key, newValue)]
    }
    return {
        setGlobalState,
        useSetGlobalState
    }
}
