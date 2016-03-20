import React from 'react';
import Board from './board.jsx';
import {NORMAL} from './../common/difficulty.js';
import SudokuHelper from './sudokuHelper.js';
import Timer from './../common/timer.jsx';
import Util from './../common/util.js';

class Sudoku extends React.Component{

  constructor(){
    super();
    this.state = {level: NORMAL, solution: [], puzzle: [], timer: {elapsed: 0}}; 
    this.onValueChange = this.onValueChange.bind(this);
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
   console.log('passes', passes);
  }
  render(){
    return (<div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <Board 
                          level={this.state.level} 
                          onValueChange={this.onValueChange} 
                          puzzle={this.state.puzzle} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
               <div className="text-info col-md-12 text-center">
                <Timer elapsed={this.state.timer.elapsed} />
                </div>

              </div>
            </div>)
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
    let board = [];
    let validBoard = SudokuHelper.fillBoard(board, 0);
    let puzzleBoard = SudokuHelper.createPuzzle(this.state.level, validBoard);
    let completePuzzle = puzzleBoard.map((number, index) => {
      let puzzleElement = {readOnly: number !== null, number, solution: validBoard[index]};
      return puzzleElement;
    }); 
    this.startTimer();
    console.log('solution', validBoard);
    this.setState({solution: validBoard, puzzle: completePuzzle});
  }

}

export default Sudoku;