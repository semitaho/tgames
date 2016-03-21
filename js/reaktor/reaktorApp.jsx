import React from 'react';
import ReactButtonContainer from './buttonContainer.jsx';
import ReactButton from './button.jsx';
import GameInfo from './game.jsx';
import Util from './../common/util.js';
import Modal from './../common/modal.jsx';
import Backend from './../common/backend.js';
import LoginModal from './../common/loginmodal.jsx';
import {PLAYING,STARTED, ENDED,NOT_LOGGED} from './../common/gamestate';

import StartButton from './../common/startButton.jsx';

const COUNTER_MS = 800;
const DECREMENT_FACTOR = 5;
class ReaktorApp extends React.Component{

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
      let newTimer = Object.assign({}, this.state.timer, {
        elapsed: Util.formatTime(current-start)
      });
      this.setState({timer: newTimer});

    },100) 
 
  }
  componentWillMount(){
    console.log('- refresh points');
    this.refreshPoints();
  }

  componentDidMount(){
    Backend.readProfileScores('Reaktor', this.props.userinfo.name).then(results => {

      if (results && results.length > 0){
        console.log('heh', results[0]);
        let topscores = {_id: results[0]._id, datetime: results[0].datetime, };
      }

    });
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

    let score = {points: currentScore};
    Backend.storeScores(this.props.userinfo.name,'Reaktor', score).then( () => {
      localStorage.setItem('topscore',currentScore);
    } );
    this.setState({gamestate: 'ended', modalshow: true, rand: -1});
  }

  render(){
    console.log('state', this.props);
    switch(this.state.gamestate){
      case STARTED:
        return this.renderStart();
      case PLAYING:
        return this.renderPlaying();
      case ENDED:
        return this.renderEnded();
      default:
        return this.renderEmpty();
    }
  }


  renderEmpty(){
    return <div />
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
        let newGame = Object.assign({}, this.state.game, {
          points: this.state.game.points+1
        })
        this.setState({game: newGame, counter: this.state.counter-DECREMENT_FACTOR});
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
    const onSave = () => {
      if (localStorage){
        let currentScore = this.state.game.points;
        if (localStorage &&  (!localStorage.topscore ||  currentScore > Number(localStorage.topscore))){

        }
      }
    };


    return(
      <div>
        {this.state.modalshow === true ? 
        <Modal title="Reaktor" onSave={onSave}>
          
          <p>{this.props.userinfo.name}, you scored: <strong>{this.state.game.points}</strong></p>
           {this.state.topscore.score.points ?  <small>Your current top score: <strong>{this.state.topscore.score.points}</strong></small>: ''}
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
