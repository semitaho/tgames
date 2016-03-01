import React from 'react';
import GAMESTATE from './gamestate';
class Timer extends React.Component {

  constructor(){
    super();
    this.state = {start : new Date().getTime(), elapsed:0};
  }

  formatTime(milliseconds){
    return (milliseconds / 1000).toFixed(1).toString().replace('.',',') + ' s';
  }


  componentDidMount(){
    this.interval = setInterval(() => {
      let current = new Date().getTime();
      this.setState({elapsed: this.formatTime(current - this.state.start)});

    },100) 


  }

  render(){
    return <small>{this.state.elapsed}</small>
  }

  componentDidUpdate(prevProps){
    console.log('cmp did update', prevProps.gamestate);
    if (prevProps.gamestate.)
  }


}

export default Timer;

