function getBoardFormat(row: number, col: number): string[][] {
  const originalBoard = [];
  for (let i = 0; i < row; i++) {
    const newRow = [];
    for (let j = 0; j < col; j++) {
      newRow.push('');
    }
    originalBoard.push(newRow);
  }

  return originalBoard;
}

export default getBoardFormat;
