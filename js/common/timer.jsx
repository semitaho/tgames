import React from 'react';
import GAMESTATE from './gamestate';
class Timer extends React.Component {

  constructor(){
    super();
  }

  componentDidMount(){
    
  }

  render(){
    return <small>{this.props.elapsed}</small>
  }

  componentDidUpdate(prevProps){
  }


}

export default Timer;

