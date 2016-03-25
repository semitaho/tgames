import SudokuHelper from './../../js/sudoku/SudokuHelper';

describe('sudokuhelper.spec', () => {
  let board;

  beforeEach(() => {
    board =  SudokuHelper.fillBoard([],0);
  });

  it('tests yksiselitteinen ratkaisu', () =>{
    let newPuzzle = SudokuHelper.createBoard(board,45);

  });

});