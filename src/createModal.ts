import React, {useState, useEffect, Component} from 'react'
import dataSource from './datasource'
type initStateType = {
  [index: string]: any
}
type listenerType = {
  [index: string]: any
}

interface setGlobalState<T> {
  (key: string): [initStateType, any];
}
export function createDataSource<T>(initState: initStateType) {
  let dataSourceInit = new dataSource(initState)
  let globalState = dataSourceInit.data
  let listeners = dataSourceInit.listeners
  const setGlobalState = <T>(key:any, nextValue:any) => {
    if (typeof nextValue === 'function') {
      globalState = {...globalState, [key]: nextValue(globalState[key])};
    } else {
      globalState = {...globalState, [key]: nextValue};
    }
    listeners[key].forEach((listener:any)=>{
      listener()
    })
  }
  const useSetGlobalState: setGlobalState<T> = (key) => {
    const [state, setState] = useState<any>(globalState[key])
    useEffect(() => {
      const listener = () => {
        setState(globalState[key]);
      };
      listeners[key].add(listener);
      listener(); // in case it's already changed
      return () => listeners[key].delete(listener); // cleanup
    }, []);
    return [state, (newValue:any) => {
      setGlobalState(key, newValue);
    }]
  }
  // todo later use hoc to give state
  // const releaseState = (WrapComponent: any) => {
  //   class ReturnComponent extends React.Component<any, any> {
  //     constructor(props:any) {
  //       super(props);
  //     }
  //     changeLocalState (data:any) {
  //       // change global state
  //       const {key, value} = data
  //       globalState[key] = value;
  //       for (let listener of listeners[key]) {
  //         listener()
  //       }
  //       this.render();
  //     }
  //     render() {
  //       const newProps = {...this.props, ...globalState, changeLocalState:this.changeLocalState}
  //       // combine with hook state
  //       return React.cloneElement(WrapComponent, {...newProps})
  //     }
  //   }
  //   return ReturnComponent
  // }
  return {
    setGlobalState,
    useSetGlobalState,
    // releaseState
  }
}
