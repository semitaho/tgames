import React from 'react';
import Board from './board.jsx';
import {NORMAL} from './../common/difficulty.js';
import SudokuHelper from './sudokuHelper.js';
import Modal from './../common/modal.jsx';

import Timer from './../common/timer.jsx';
import Util from './../common/util.js';
import {PLAYING,ENDED} from './../common/gamestate';

class Sudoku extends React.Component{

  constructor(){
    super();

    this.state = {level: NORMAL, gamestate: PLAYING, solution: [], puzzle: [], timer: {elapsed: 0}}; 
    this.onValueChange = this.onValueChange.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }
  onValueChange(index,value){
    let puzzle = this.state.puzzle;
    let newValue = Object.assign({}, puzzle[index], {
      number: parseInt(value,10)
    });
   puzzle[index] = newValue;
   this.setState({puzzle});
   let passes = puzzle.every(item => {
    return item.number === item.solution;
   })
   if (passes){
    this.endGame();
   }
  }

  endGame(){
    clearInterval(this.interval);
    this.setState({gamestate: ENDED});
  }
  render(){
    switch(this.state.gamestate){
      case PLAYING:
        return this.renderPlaying();
      case ENDED:
        return this.renderEnded();  
      default:
        return this.renderPlaying();  
    }
    return this.renderPlaying();
  }

  renderPlaying(){
    const resetBoard = () => {
      let puzzle = this.state.puzzle;
      let startPuzzle = puzzle.map(item => {
        if (!item.readOnly){
          item.number = null;
        }
        return item;
      });
      this.setState({puzzle: startPuzzle});
    };
    return (<div className="container-fluid">
              <div className="row">
                     <div className="col-md-8 col-md-offset-2">
                      <Board 
                          level={this.state.level} 
                          onValueChange={this.onValueChange} 
                          puzzle={this.state.puzzle} />
                    </div>
              </div>
              <div className="row">
               <div className="text-info col-md-12 text-center">
                <Timer elapsed={this.state.timer.elapsed} />
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12 center-block">
                    <button onClick={resetBoard} type="button" className="btn btn-block btn-danger">Reset board</button>

                    <button onClick={this.startNewGame} type="button" className="btn btn-block btn-success">New game</button>
                  </div>
                </div>  
              </div>

              </div>
      </div>)
  }

  renderEnded(){
     return(
      <div className="container">
        <Modal title="Sudoku">
          
          <p>{this.props.userinfo.name}, congratulations, you solved normal sudoku in: <strong>{this.state.timer.elapsed}</strong></p>
        </Modal>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 center-block">
            <button onClick={this.startNewGame} type="button" className="btn btn-block btn-success">New game</button>
          </div>
        </div>
      </div>

      ) 
  }

  startTimer(){
    if (this.interval){
      clearInterval(this.interval);
    }
    let start = new Date().getTime();
    this.interval = setInterval(() => {
      let current = new Date().getTime();
      this.state.timer.elapsed =Util.formatTime(current-start);
      this.setState({timer: this.state.timer});

    },100) 
 
  }

  startNewGame(){
    let board = [];
    let validBoard = SudokuHelper.fillBoard(board, 0);
    let puzzleBoard = SudokuHelper.createPuzzle(this.state.level, validBoard);
    let completePuzzle = puzzleBoard.map((number, index) => {
      let puzzleElement = {readOnly: number !== null, number, solution: validBoard[index]};
      return puzzleElement;
    }); 
    this.startTimer();
    this.setState({gamestate: PLAYING, solution: validBoard, puzzle: completePuzzle});
  }

  componentDidMount(){
    this.startNewGame();
  }

}

export default Sudoku;