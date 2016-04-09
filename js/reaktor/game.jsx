import React from 'react';
import Timer from './../common/timer.jsx';
class GameInfo extends React.Component{
  render(){
    return <div className="center-align text-info"><h2>{this.props.points}</h2>
            <Timer {...this.props.timer}  gamestate={this.props.gamestate} />
        </div>
  }

}

export default GameInfo;