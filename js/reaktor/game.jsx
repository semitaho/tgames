import React from 'react';
import Timer from './../common/timer.jsx';
class Game extends React.Component{
  render(){
    return <div className="text-center text-info"><h2>{this.props.points}</h2>
            <Timer />
        </div>
  }

}

export default Game;