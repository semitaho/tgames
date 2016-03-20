import React from 'react';

class Cell extends React.Component{

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.keyMapping = {49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9};
  }


  onValueChange(e){
    let val = e.target.value;
    let num = val.substr(val.length-1, val.length);
    if (1 <= num && num <= 9){
      this.props.onValueChange(num);
    }
  }
  


  render(){
    let clazz = "cell text-center ";
    if (!this.props.readOnly){
      clazz += 'edit';
    }
    return <input className={clazz} tabIndex={this.props.readOnly ? -1 : ''} readOnly={this.props.readOnly} type="number" min="1" max="9" onChange={this.onValueChange} value={this.props.defaultValue} />
  }
}



export default Cell;