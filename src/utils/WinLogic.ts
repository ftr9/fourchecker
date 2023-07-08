import { ROW_COUNT, COL_COUNT } from '../constants/Board';

interface ICheckForVerticalWin {
  curCol: number;
  BoardValue: string[][];
  activePlayerValue: string;
}

interface ICheckForHorizontalWin {
  curRow: number;
  BoardValue: string[][];
  activePlayerValue: string;
}

interface ICheckForDiagonalWin {
  curRow: number;
  curCol: number;
  BoardValue: string[][];
  activePlayerValue: string;
}

export function _checkForVerticalWin({
  curCol,
  BoardValue,
  activePlayerValue,
}: ICheckForVerticalWin): boolean {
  let correctCount = 0;
  for (let i = ROW_COUNT - 1; i >= 0; i--) {
    if (BoardValue[i][curCol] === activePlayerValue) {
      correctCount++;
    } else {
      correctCount = 0;
      continue;
    }

    if (correctCount === 4) {
      return true;
    }
  }
  return false;
}

export function _checkForHorizontalWin({
  curRow,
  BoardValue,
  activePlayerValue,
}: ICheckForHorizontalWin) {
  let correctCount = 0;

  for (let i = 0; i < COL_COUNT; i++) {
    if (BoardValue[curRow][i] === activePlayerValue) {
      correctCount++;
    } else {
      correctCount = 0;
      continue;
    }
    if (correctCount === 4) {
      return true;
    }
  }

  return false;
}

export function _checkForLeftDiagonalWin({
  curCol,
  curRow,
  activePlayerValue,
  BoardValue,
}: ICheckForDiagonalWin) {
  let correctCount = 0;
  let initialDiagonalRow = curRow;
  let initialDiagonalCol = curCol;

  for (let i = curRow; i < ROW_COUNT - 1; i++) {
    initialDiagonalCol--;
    initialDiagonalRow++;

    if (initialDiagonalCol <= 0) {
      break;
    }
  }

  for (let i = initialDiagonalCol; i < COL_COUNT; i++) {
    if (BoardValue[initialDiagonalRow][i] === activePlayerValue) {
      correctCount++;
      if (correctCount === 4) {
        return true;
      }
    } else {
      correctCount = 0;
    }

    initialDiagonalRow--;

    if (initialDiagonalRow < 0) {
      break;
    }
  }

  return false;
}

export function _checkForRightDiagonalWin({
  curCol,
  curRow,
  activePlayerValue,
  BoardValue,
}: ICheckForDiagonalWin) {
  let correctCount = 0;
  let initialDiagonalRow = curRow;
  let initialDiagonalCol = curCol;

  for (let i = curRow; i < ROW_COUNT - 1; i++) {
    initialDiagonalCol++;
    initialDiagonalRow++;

    if (initialDiagonalCol >= COL_COUNT - 1) {
      break;
    }
  }

  for (let i = initialDiagonalCol; i >= 0; i--) {
    if (BoardValue[initialDiagonalRow][i] === activePlayerValue) {
      correctCount++;
      if (correctCount === 4) {
        return true;
      }
    } else {
      correctCount = 0;
    }

    initialDiagonalRow--;

    if (initialDiagonalRow < 0) {
      break;
    }
  }

  return false;
}
