import { useState, useEffect } from 'react';
import './App.css';

import { ROW_COUNT, COL_COUNT } from './constants/Board';
import {
  _checkForVerticalWin,
  _checkForHorizontalWin,
  _checkForLeftDiagonalWin,
  _checkForRightDiagonalWin,
} from './utils/WinLogic';
import getBoardFormat from './utils/getBoardFormat';
import Indicator from './components/Indicator';
import WinPopUp from './components/Popup/WinPopUp';
import ClickEffectSound from './assets/sound/clickeffect.wav';
import WinEffectSound from './assets/sound/winsound.wav';

function getValueByActivePlayer(activePlayer: string): string {
  if (activePlayer === 'PLAYER_1') {
    return 'R';
  }
  return 'S';
}

function App() {
  const [activeCol, setActiveCol] = useState(-1);
  const [activePlayer, setActivePlayer] = useState('PLAYER_1');
  const [BoardValue, setBoardValue] = useState(
    getBoardFormat(ROW_COUNT, COL_COUNT)
  );
  const [isGameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (isGameFinished) {
      setTimeout(() => {
        setGameFinished(false);
        setActivePlayer('PLAYER_1');
      }, 2000);
    }
  }, [isGameFinished]);

  const _onBoardClick = async (curCol: number) => {
    //play the sound
    const clickSound = new Audio(ClickEffectSound);
    await clickSound.play();

    let insertedRowIdx = 0;

    if (BoardValue[0][curCol]) {
      return;
    }
    for (let i = ROW_COUNT - 1; i >= 0; i--) {
      if (!BoardValue[i][curCol]) {
        const newBoard = [...BoardValue];
        newBoard[i][curCol] = getValueByActivePlayer(activePlayer);
        setBoardValue(newBoard);
        insertedRowIdx = i;
        break;
      }
    }

    const isWin = _checkForWin(curCol, insertedRowIdx);

    if (isWin) {
      //1) play the sound
      const winAudio = new Audio(WinEffectSound);
      await winAudio.play();

      //2) declare winner
      setGameFinished(true);
      setBoardValue(getBoardFormat(ROW_COUNT, COL_COUNT));
      return;
    }

    setActivePlayer(activePlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1');
  };

  const _checkForWin = (curCol: number, curRow: number) => {
    //1) check vertically
    const activePlayerValue = getValueByActivePlayer(activePlayer);
    const isVerticalWin = _checkForVerticalWin({
      curCol,
      BoardValue,
      activePlayerValue,
    });
    if (isVerticalWin) return true;

    //2) check horizontally
    const isHorizontalWin = _checkForHorizontalWin({
      curRow,
      BoardValue,
      activePlayerValue,
    });
    if (isHorizontalWin) return true;

    //3) check left diagonal
    const isLeftDiagonalWin = _checkForLeftDiagonalWin({
      curCol,
      curRow,
      activePlayerValue,
      BoardValue,
    });
    if (isLeftDiagonalWin) return true;

    //4) check right diagonal
    const isRightDiagonalWin = _checkForRightDiagonalWin({
      curCol,
      curRow,
      activePlayerValue,
      BoardValue,
    });
    if (isRightDiagonalWin) return true;

    return false;
  };

  return (
    <>
      {isGameFinished && <WinPopUp playerName={activePlayer} />}
      <div className="playerIndicator">{activePlayer}</div>
      <Indicator activeCol={activeCol} />
      {BoardValue.map((board, boardIdx) => {
        return (
          <div className="row" key={boardIdx}>
            {board.map((item, index) => {
              return (
                <div
                  style={{
                    background: item ? 'white' : 'transparent',
                  }}
                  onMouseEnter={() => {
                    setActiveCol(index);
                  }}
                  onMouseLeave={() => {
                    setActiveCol(-1);
                  }}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    _onBoardClick(index);
                  }}
                  className="checker_placeholder droppableArea"
                  key={index}
                >
                  {item ? item : `${boardIdx},${index}`}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
