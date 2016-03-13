import React from 'react';
import ReactButtonContainer from './buttonContainer.jsx';
import ReactButton from './button.jsx';
import GameInfo from './game.jsx';
import Util from './../common/util.js';
import Modal from './../common/modal.jsx';
import LoginModal from './../common/loginmodal.jsx';
import {PLAYING,STARTED, ENDED,NOT_LOGGED} from './../common/gamestate';

import StartButton from './../common/startButton.jsx';
class ReaktorApp extends React.Component{

  constructor(){
    super();
    this.colorArray  = [{type:'red'}, {type:'yellow'}, {type:'blue'}, {type:'green'}];
    this.state = {modalshow:false, timer: {elapsed: 0},  gamestate: ''};
    this.startGame = this.startGame.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
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
  componentDidMount(){
  }

  checkLoginStatus(response){
    if (response.status === 'connected') {
       FB.api('/me', response => {
       console.log('Good to see you, ' + response.name + '.');
       this.setState({response,  gamestate: STARTED})
     });
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      console.log('not not_authorized');
      this.setState({gamestate: NOT_LOGGED});
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      console.log('not in facebook');
      this.setState({gamestate: NOT_LOGGED});
    }
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
   this.startTimer(); 
   this.setState({gamestate: PLAYING,game: {points: 0}, resultsqueue: [], rand: -1,clickedqueue: [], counter: 800}); 
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
      if (this.state.gamestate === PLAYING){
        interval = setInterval(myFunction, this.state.counter);
      }
    };
    var interval = setTimeout(myFunction, this.state.counter);
  }

  endGame(){
    clearInterval(this.interval);
    this.setState({gamestate: 'ended', modalshow: true, rand: -1});
  }

  render(){
    console.log('state', this.props);
    switch(this.state.gamestate){
      case NOT_LOGGED:
        return this.renderNotLogged();
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

  renderNotLogged(){

    return(
        <LoginModal onClick={() => {
            FB.login(response => {
              if (response.status === 'connected') {
                location.reload(true);
              }
            });
          }} /> 
    )

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
        this.setState({game: newGame, counter: this.state.counter-10});
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
      console.log('on save..');
      if (localStorage){
        let currentScore = this.state.game.points;
        if (localStorage &&  (!localStorage.topscore ||  currentScore > Number(localStorage.topscore))){
          console.log('keijo kurttila');
          localStorage.setItem('topscore',currentScore);

        }
      }
      this.setState({modalshow:false});
    };


    return(
      <div>
        {this.state.modalshow === true ? 
        <Modal title="Reaktor" onSave={onSave}>
          
          <p>{this.state.response.name}, you scored: <strong>{this.state.game.points}</strong></p>
           {localStorage.topscore ?  <small>Your current top score: <strong>{localStorage.topscore}</strong></small>: ''}
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
