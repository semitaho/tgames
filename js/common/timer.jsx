import React from 'react';

class Timer extends React.Component {

  constructor(){
    super();
    this.state = {start : new Date().getTime(), elapsed:0};
  }

  formatTime(milliseconds){
    return (milliseconds / 1000).toFixed(1).toString().replace('.',',') + ' s';
  }


  componentDidMount(){
    setInterval(() => {
      let current = new Date().getTime();
      this.setState({elapsed: this.formatTime(current - this.state.start)});

    },100) 


  }


  render(){
    return <small>{this.state.elapsed}</small>
  }

}

export default Timer;

