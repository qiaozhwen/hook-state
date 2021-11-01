import React from 'react';
function releaseState (WrapComponent: any){
  class ReturnComponent extends WrapComponent{
    constructor(props) {
      super(props);
    }
    render(){
      const newProps  = {...this.props}
      return(
        <WrapComponent/>
      )
    }
  }
  return ReturnComponent
}
