import React from 'react';
import ReactButtonContainer from './buttonContainer.jsx';
import ReactButton from './button.jsx';
import GameInfo from './game.jsx';
import Util from './../common/util.js';
import Modal from './../common/modal.jsx';
import Backend from './../common/backend.js';
import App from './../common/app.jsx';
import {PLAYING,STARTED, ENDED,NOT_LOGGED} from './../common/gamestate';

import StartButton from './../common/startButton.jsx';

const COUNTER_MS = 800;
const DECREMENT_FACTOR = 5;
class ReaktorApp extends App{

  constructor(){
    super();
    this.colorArray  = [{type:'red'}, {type:'yellow'}, {type:'blue'}, {type:'green'}];
    this.state = {modalshow:false, timer: {elapsed: 0}, scores: [],  gamestate: STARTED};
    this.startGame = this.startGame.bind(this);
  }

  startTimer(){
    let start = new Date().getTime();
    this.interval = setInterval(() => {
      let current = new Date().getTime();
      this.state.timer.elapsed = Util.formatTime(current-start);
      this.setState({timer: this.state.timer});

    },100) 
 
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

  refreshPoints(){
    Backend.readScores('Reaktor').then(data => {
      this.props.pointsLoaded(data);
    });
    Backend.readProfileScores('Reaktor', this.props.userinfo.name).then(results => {
      if (results && results.length > 0){
        let topscores = {_id: results[0]._id, name: results[0].name,  datetime: results[0].datetime, score: results[0].score};
        this.setState({topscores});
      } else {
        let topscores = {name: this.props.userinfo.name, score: {}};
        this.setState({topscores});
      }

    });
  }

  startGame(){
   this.startTimer(); 
   this.setState({gamestate: PLAYING,game: {points: 0}, resultsqueue: [], rand: -1,clickedqueue: [], counter: COUNTER_MS}); 
   let counter = COUNTER_MS;
    const myFunction = () => {
      clearInterval(interval);
      var currentRand = -1;
      do {
        currentRand = Math.floor((Math.random() * 4) + 1) -1;

      } while(currentRand === this.state.resultsqueue[this.state.resultsqueue.length-1]);
      let resultsqueue = this.state.resultsqueue;
      resultsqueue.push(currentRand); 
      this.setState({rand: currentRand, resultsqueue});
      if (this.state.gamestate === PLAYING){
        interval = setInterval(myFunction, this.state.counter);
      }
    };
    var interval = setTimeout(myFunction, this.state.counter);
  }

  endGame(){
    clearInterval(this.interval);


    let score = {points: this.state.game.points, elapsed: this.state.timer.elapsed};
    console.log('score', score);
    if (score.points >= this.state.topscores.score.points || !this.state.topscores.score.points){
      console.log('aijaa');
      Backend.storeScores(this.state.topscores._id, this.props.userinfo.name,'Reaktor', score).then( () => {
        this.refreshPoints();
      } );
    }
    this.setState({gamestate: 'ended', modalshow: true, rand: -1});
  }
  
  renderStart(){
    return (<div className="panel panel-default reaktor-panel">
      <ReactButtonContainer>
      {this.colorArray.map ((color,index) => {
        let key = index;
        return (<ReactButton type={color.type}  key={key} />)
        })}
      </ReactButtonContainer>
      <div className="panel-footer reaktor-panel-footer">
        <StartButton onStart={this.startGame} /> 
      </div>
    </div> ) 

  }

  renderPlaying(){
    const onPress = (clicked) => {
      let clickedqueue = this.state.clickedqueue;
      if (this.checkGameOver(clicked)){
        this.endGame();
      } else {
        clickedqueue.push(clicked);
        this.state.game.points = this.state.game.points+1;
        this.setState({game: this.state.game, counter: this.state.counter-DECREMENT_FACTOR});
      }
    };
    return(
      <div className="panel panel-default reaktor-panel">
        <ReactButtonContainer>
          {this.colorArray.map ((color,index) => {
            let key = index;
            return (<ReactButton type={color.type}  key={key} onPress={() => onPress(key)} active={index === this.state.rand} />) 
          }) }
        </ReactButtonContainer>
        <div className="panel-footer reaktor-panel-footer">
          <GameInfo timer={this.state.timer} gamestate={PLAYING} {...this.state.game} />
        </div>
      </div> ) 
  }

  renderEnded(){
    return(
      <div>
        {this.state.modalshow === true ? 
        <Modal title="Reaktor">
          
          <p>{this.props.userinfo.name}, you scored: <strong>{this.state.game.points}</strong></p>
           <small>Your current top score: <strong>{this.state.topscores.score.points}</strong>, created: <strong>{Util.formatDate(this.state.topscores.datetime)}</strong> </small>
        </Modal> : ''}

      <div className="panel panel-default reaktor-panel">
        <ReactButtonContainer>
          {this.colorArray.map ((color,index) => {
            let key = index;
            return (
              <ReactButton blink={true}  type={color.type}  key={key} />) 
          }) }
        </ReactButtonContainer>
        <div className="panel-footer reaktor-panel-footer">
          <StartButton onStart={this.startGame} />
        </div>
      </div></div> ) 

  }

}


export default ReaktorApp;
