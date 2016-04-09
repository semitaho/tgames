import React from 'react';
import Board from './board.jsx';
import {NORMAL} from './../common/difficulty.js';
import SudokuHelper from './sudokuHelper.js';
import Modal from './../common/modal.jsx';
import Backend from './../common/backend.js';
import App from './../common/app.jsx';
import Util from './../common/util.js';
import {PLAYING, ENDED} from './../common/gamestate';

class Sudoku extends App {

  constructor() {
    super();

    this.state = {level: NORMAL, gamestate: PLAYING, solution: [], puzzle: [], timer: {elapsed: 0}};
    this.onValueChange = this.onValueChange.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  onValueChange(index, value) {
    let puzzle = this.state.puzzle;
    puzzle[index].number = parseInt(value, 10);
    this.setState({puzzle});
    let passes = puzzle.every(item => {
      return item.number === item.solution;
    });
    if (passes) {
      this.endGame();
    }
  }

  endGame() {
    let currentScore = this.state.userdata.score;
    let newAttempt = this.state.userdata.score.attempt;
    let level = this.state.userdata.score.level;
    if (currentScore.attempt < 3) {
      newAttempt += 1;
    } else if (currentScore.attempt === 3) {
      newAttempt = 1;
      level += 1;
    }
    let scoreObj = {level, attempt: newAttempt};
    let userdata = this.state.userdata;
    userdata.score = scoreObj;
    if (this.props.userinfo.userid) {
      Backend.storeScores(this.state.userdata._id, this.state.userdata.name, 'Sudoku', scoreObj).then(() => {
        this.setState({gamestate: ENDED, userdata});
      });
    } else {
      this.setState({gamestate: ENDED, userdata});
    }
  }

  renderPlaying() {
    const resetBoard = () => {
      let puzzle = this.state.puzzle;
      let startPuzzle = puzzle.map(item => {
        if (!item.readOnly) {
          item.number = null;
        }
        return item;
      });
      this.setState({puzzle: startPuzzle});
    };
    let userdata = this.state.userdata;
    return (<div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Board
            level={this.state.level}
            onValueChange={this.onValueChange}
            puzzle={this.state.puzzle}/>
        </div>
      </div>
      <div className="row">
        <div className="text-info col m12 l12 s12 center-align">
          {this.state.userdata ? <h4>Level: {this.state.userdata.score.level}<br/>
            <small>Puzzle {this.state.userdata.score.attempt}/3</small>
          </h4> : ''}
          <button onClick={resetBoard} type="button" className="btn btn-large blue">Reset board</button>
          <button onClick={() => this.startNewGame(userdata)} type="button" className="red btn-large btn-success">New game</button>
        </div>
      </div>

      </div>)
  }

  renderEnded() {
    let userdata = this.state.userdata;
    return (
      <div className="container">
        <Modal title="Sudoku" onSave={() => this.startNewGame(userdata)}>
          <p>{this.props.userinfo.name}, congratulations, you solved <strong>level {this.state.userdata.score.attempt === 1 ? this.state.userdata.score.level - 1 : this.state.userdata.score.level}</strong> sudoku!</p>
        </Modal>
      </div>

    )
  }


  startNewGame(userdata) {
    let board = [];
    let validBoard = SudokuHelper.fillBoard(board, 0);
    let puzzleBoard = SudokuHelper.createPuzzle(userdata.score.level, validBoard);
    let completePuzzle = puzzleBoard.map((number, index) => {
      let puzzleElement = {readOnly: number !== null, number, solution: validBoard[index]};
      return puzzleElement;
    });
    this.setState({gamestate: PLAYING, solution: validBoard, puzzle: completePuzzle});
  }

  refreshPoints() {
    let sortObject = {'score.level': -1, 'score.attempt': -1};
    Backend.readScores('Sudoku', sortObject).then(data => {
      console.log('data', data);
      let scoredata = data.map(item => {
        let score = item.score;
        score.points = item.score.level;

        return {name: item.name, score};
      });
      this.props.pointsLoaded(scoredata);
    });

  }

  componentWillMount() {
    super.componentWillMount();
    Backend.readProfileScores('Sudoku', this.props.userinfo.name).then(data => {
      console.log('has data', data);
      let userData = null;
      if (data.length === 0) {
        userData = this.createSudokuUserData(this.props.userinfo.name);
      } else {
        let scoreitem = data[0];
        userData = {_id: scoreitem._id, name: scoreitem.name, app: 'Sudoku', score: scoreitem.score};
        this.setState({userdata: userData});
      }
      this.startNewGame(userData);

    });

  }

  createSudokuUserData(username) {
    console.log('creating data...', username);
    let userData = {name: username, app: 'Sudoku', score: {level: 1, attempt: 1}};
    this.setState({userdata: userData});
    return userData;

  }

}

export default Sudoku;