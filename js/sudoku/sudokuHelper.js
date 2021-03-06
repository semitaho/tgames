const SUDOKU_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const CORRECT_INDICES = [0, 3, 6, 27, 30, 33, 54, 57, 60];
const NORMAL_LEVEL_START = 20;
class SudokuHelper {

  static fillBoard(currentBoard, index) {
    if (index === 81) {
      return currentBoard;
    }
    if (currentBoard[index]) {
      return this.fillBoard(currentBoard, index + 1);
    }

    let availableNumbers = this.shuffle(this.resolveAvailableNumbers(currentBoard, index));
    if (availableNumbers.length === 0) {
      return false;
    }

    for (let numberIndex = 0; numberIndex < availableNumbers.length; numberIndex++) {
      let newBoard = currentBoard.slice();
      let nextNumber = availableNumbers[numberIndex];
      newBoard[index] = nextNumber;
      let generatedBoard = this.fillBoard(newBoard, index + 1);
      if (generatedBoard !== false) {
        return generatedBoard;
      }
    }
    return false;
  }

  static shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  static resolveAvailableNumbers(board, index) {
    let horizontalNumbers = this.getAvailableNumbersHorizontal(board, index);
    let verticalNumbers = this.getAvailableNumbersVertical(board, index);
    let boxNumbers = this.getAvailableNumbersBox(board, index);
    let availableNumbers = horizontalNumbers.filter(number => verticalNumbers.indexOf(number) > -1).filter(number => boxNumbers.indexOf(number) > -1);
    return availableNumbers;
  }

  static getAvailableNumbersHorizontal(board, index) {
    var SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let start = index - ((index) % 9)
    for (let current = start; current < start + 9; current++) {
      let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);
      if (sudokuNumberIndex > -1) {
        SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
      }
    }
    return SUDOKU_NUMBERS;
  }

  static getAvailableNumbersVertical(board, index) {
    var SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let start = (index ) % 9;
    for (let current = start; current < 81; current += 9) {
      let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);
      if (sudokuNumberIndex > -1) {
        SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
      }
    }
    return SUDOKU_NUMBERS;
  }

  static getAvailableNumbersBox(board, index) {
    var SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let chosen = this.getChosenStart(index);
    for (let current = chosen; current <= chosen + 2; current++) {
      let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);

      if (sudokuNumberIndex > -1) {
        SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
      }
      let sudokuNumberIndex2 = SUDOKU_NUMBERS.indexOf(board[current + 9]);
      if (sudokuNumberIndex2 > -1) {
        SUDOKU_NUMBERS.splice(sudokuNumberIndex2, 1);
      }
      let sudokuNumberIndex3 = SUDOKU_NUMBERS.indexOf(board[current + 18]);
      if (sudokuNumberIndex3 > -1) {
        SUDOKU_NUMBERS.splice(sudokuNumberIndex3, 1);

      }
    }
    return SUDOKU_NUMBERS;
  }

  static getChosenStart(index) {
    for (let i = 0; i < CORRECT_INDICES.length; i++) {
      let boxStart = CORRECT_INDICES[i];
      // x, y
      for (let x = boxStart; x <= boxStart + 2; x++) {
        if (x === index || x + 9 === index || x + 18 === index) {
          let chosen = boxStart;
          return chosen;
        }
      }
    }
  }

  static createPuzzle(level, validBoard) {
    if (level <= 10) {
      let removal = NORMAL_LEVEL_START + (level * 2);
      return this.createBoard(validBoard, removal);
    }
    let beforeLevel10Removal = (10 * 2) + NORMAL_LEVEL_START;
    let erotus = level - 10;
    let kokonaisRemoval = beforeLevel10Removal + erotus;
    return this.createBoard(validBoard, kokonaisRemoval);

  }

  static createBoard(board, removeCount) {
    const REMOVAL = removeCount;
    let removals = [];
    let puzzleBoard = board.slice();
    for (let i = 1; i <= REMOVAL; i++) {
      var randIndex = -1;
      let removalSuggestion = -1;
      let copyRemovals = null;
      do {
        randIndex = Math.floor(Math.random() * board.length);
        copyRemovals = removals.slice();
        copyRemovals.push(randIndex)
      } while (puzzleBoard[randIndex] === null || !this.hasYksiselitteinen(board, copyRemovals));
      puzzleBoard[randIndex] = null;
      removals.push(randIndex);
    }
    return puzzleBoard;
  }

  static isFilled(board){
    var isFilled = true;
    board.forEach(value => {
      if (!value){
        isFilled = false;
      }
    });
    return isFilled;
  }

  static getAvailableIndex(board){
    var isFilled = true;
    let chosen = -1;
    board.forEach((value,index) => {
      if (!value){
        chosen = index;
      }
    });
    return chosen;
  }

  static countSolutions(board){

    if (this.isFilled(board)){
      return 1;
    }
    let chosenIndex = this.getAvailableIndex(board);

    let availableNumbers = this.resolveAvailableNumbers(board, chosenIndex);
    if (availableNumbers.length === 0){
      return 0;
    }
    let  validBoards = 0;
    availableNumbers.forEach(number => {
      let newBoard = board.slice();
      newBoard[chosenIndex] = number;
      validBoards += this.countSolutions(newBoard);
    });
    return validBoards;

  }

  static hasYksiselitteinen(originalBoard, removals) {
    let copyBoard = originalBoard.slice();
    let removeObject = {};
    removals.forEach(removeindex => {
      copyBoard[removeindex] = null;
    });
    let validBoards = 0;
    validBoards  += this.countSolutions(copyBoard);
    return validBoards === 1;

  }

  static validateBoard(board) {
    for (let i = 0; i < board.length; i++) {
      this.resolveAvailableNumbers(board, i);
    }
  }

  static randSudokuNumber(availableNumbers) {
    let nextNumIndex = Math.floor((Math.random() * availableNumbers.length));
    return availableNumbers[nextNumIndex];
  }


}

export default SudokuHelper;