import React from 'react';
import Timer from './../common/timer.jsx';
class Game extends React.Component{
  render(){
    console.log('gamestate', this.props);
    return <div className="text-center text-info"><h2>{this.props.points}</h2>
            <Timer gamestate={this.props.gamestate} />
        </div>
  }

}

export default Game;