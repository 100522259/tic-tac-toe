import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  /**
   * explanation:
   * export -> makes this function accessible  outside of this file
   * default -> tells other files using your code that it's the main function of the file
   */

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    // slice creates a copy of the squares array
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) status = "Winner: " + winner;
  else status = "Next player: " + (xIsNext ? "X" : "O");

  // Make the return more dynamic:
  const row = [];
  // It's important to note that we can't just have two pushes,
  // one to open the div and another to close it
  // It must be done in one go. So we have to create the columns, then insert
  // into the div in one go.
  for (let i = 0; i < 3; i++) {
    const column = [];
    for (let j = 0; j < 3; j++) {
      // because we're making a list, we need to give an id to each square
      column.push(
        <Square
          key={i * 3 + j}
          value={squares[i * 3 + j]}
          onSquareClick={() => handleClick(i * 3 + j)}
        />
      );
    }
    row.push(
      <div key={i} className="board-row">
        {column}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {row}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    // will update currentMove to nextMove. In addition, xIsNext is set to true
    // when the next move we're changing currentMove to is even
    setCurrentMove(nextMove);
  }

  // as we iterate through the history array we passed to map,
  // the squares argument foes through each element of history, and
  // the move argument goes through each array index (0, 1, 2, ...)
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) description = "Go to move #" + move;
    else description = "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
