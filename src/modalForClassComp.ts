import React from 'react';
function releaseState (WrapComponent: any){
  class ReturnComponent extends React.Component{
    constructor(props) {
      super(props);
    }
    render(){
      return(
        <WrapComponent/>
      )
    }
  }
  return ReturnComponent
}
