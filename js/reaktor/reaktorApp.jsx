import React from 'react';
import ReactButtonContainer from './buttonContainer.jsx';
import ReactButton from './button.jsx';
import Game from './game.jsx';

import StartButton from './../common/startButton.jsx';
class ReaktorApp extends React.Component{

  constructor(){
    super();
    this.colorArray  = [{type:'red'}, {type:'yellow'}, {type:'blue'}, {type:'green'}];
    this.state = {rand: -1, resultsqueue: [], counter: 800, clickedqueue: [], playing: false, game: {}};
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount(){
 
  }

  checkGameOver(offered){
    let clickedqueue = this.state.clickedqueue;
    let resultsqueue = this.state.resultsqueue;
    if (clickedqueue.length >= resultsqueue.length || clickedqueue.length+ 5 <= resultsqueue.length){
      return true;
    }
    let offeredIndex = clickedqueue.length;
    if (resultsqueue[offeredIndex] !== offered){
      return true;
    }
    return false;
  }

  startGame(){
   this.setState({playing: true, game: {points: 0}}); 
   let counter = 800;
    const myFunction = () => {
      clearInterval(interval);
      var currentRand = -1;
      do {
        currentRand = Math.floor((Math.random() * 4) + 1) -1;

      } while(currentRand === this.state.resultsqueue[this.state.resultsqueue.length-1]);
      let resultsqueue = this.state.resultsqueue;
      resultsqueue.push(currentRand); 
      this.setState({rand: currentRand, resultsqueue})
      counter = counter;
      if (!this.state.ended){
        interval = setInterval(myFunction, this.state.counter);
      }
    };
    var interval = setTimeout(myFunction, this.state.counter);
  }

  render(){
    const onPress = (clicked) => {
      let clickedqueue = this.state.clickedqueue;
      if (this.checkGameOver(clicked)){
        alert('GAME OVER!');
        this.setState({ended: true, rand: -1, counter: 10});
      } else {
        clickedqueue.push(clicked);
        let newGame = Object.assign({}, this.state.game, {
          points: this.state.game.points+1
        })
        this.setState({game: newGame, counter: this.state.counter-10});
      }
    };
    return(<div className="panel panel-default reaktor-panel">
                    
                <ReactButtonContainer>
                    {this.colorArray.map ((color,index) => {
                      let key = index;
                      return (<ReactButton blink={this.state.ended}  type={color.type}  key={key} onPress={() => onPress(key)} active={index === this.state.rand} />) 
                  }) }
                </ReactButtonContainer>
                <div className="panel-footer reaktor-panel-footer">
                   {!this.state.playing ? <StartButton onStart={this.startGame} />  : ''}
                   {this.state.playing ? <Game {...this.state.game} /> : ''}

                </div>
            </div> ) 
  }

}

export default ReaktorApp;
