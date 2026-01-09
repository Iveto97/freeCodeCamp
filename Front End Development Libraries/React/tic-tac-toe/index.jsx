const { useState, useMemo, useCallback, useRef } = React;

function Button({ value, onSquareClick }) {
  return (
    <button
      className="btn-style square"
      type="button"
      ref={value}
      onClick={(e) => onSquareClick(e, 0)}
    ></button>
  );
}

function Mark({ value, styles }) {
  return (
    <span className={styles} style={{ fontSize: 30, display: "inline-block" }}>
      {value}
    </span>
  );
}

function Result({ header, titleRef, isLock, victor }) {
  return (
    <div style={{ opacity: isLock ? 1 : 0 }} className="result btn-style">
      <h5 className="result-header">{header}</h5>
      <p
        style={{ color: victor === "o" ? "#f2b237" : "#31c4be" }}
        className="winner-style"
      >
        <span ref={titleRef} style={{ display: "inline-block" }}></span> TAKES
        THE ROUND
      </p>
    </div>
  );
}

const initialBoard = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

export function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [currentMove, setCurrentMove] = useState(0);
  const [lock, setLock] = useState(false);
  const [victor, setVictor] = useState(null);
  let titleRef = useRef(null);

  let box_0 = useRef(null);
  let box_1 = useRef(null);
  let box_2 = useRef(null);
  let box_3 = useRef(null);
  let box_4 = useRef(null);
  let box_5 = useRef(null);
  let box_6 = useRef(null);
  let box_7 = useRef(null);
  let box_8 = useRef(null);

  let box_array = [
    box_0,
    box_1,
    box_2,
    box_3,
    box_4,
    box_5,
    box_6,
    box_7,
    box_8,
  ];

  const handleChangeTurn = (e, index) => {
    const point = board;

    if (lock || point[index]?.sign) {
      return;
    }
    const symbol = nextSymbol;

    if (symbol) {
      e.target.innerHTML = '<span class="x-mark font">&#10008;</span>';
      point[index] = {
        ...point[index],
        sign: "x",
      };
      setBoard(point);
      setCurrentMove((prevMove) => prevMove + 1);
    } else {
      e.target.innerHTML = '<span class="o-mark font">&#128903;</span>';
      point[index] = {
        ...point[index],
        sign: "o",
      };
      setBoard(point);
      setCurrentMove((prevMove) => prevMove - 1);
    }

    const winner = calculateWinner(board);
    if (winner) {
      setLock(true);
      winner === "o"
        ? (titleRef.current.innerHTML = '<span class="o-mark">&#128903;</span>')
        : (titleRef.current.innerHTML = '<span class="x-mark">&#10008;</span>');
      setVictor(winner);
    }
    const isGameOver = board.filter((square) => square.sign).length === 9;

    if (!winner && isGameOver) {
      setLock(true);
      titleRef.current.innerHTML = "NO ONE";
    }
  };

  const handleReset = () => {
    setLock(false);
    setBoard([
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
    ]);
    setCurrentMove(0);
    setVictor(null);
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
  };

  const nextSymbol = useMemo(() => {
    const square = currentMove % 2 === 0;
    return square;
  }, [board, currentMove]);

  const calculateWinner = useCallback(
    (board) => {
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

      for (let index = 0; index < lines.length; index++) {
        const [a, b, c] = lines[index];
        if (
          board[a]?.sign &&
          board[a]?.sign === board[b]?.sign &&
          board[b]?.sign === board[c]?.sign
        ) {
          return board[a].sign;
        }
      }
    },
    [board]
  );

  return (
    <div className="container">
      <h1 className="header">Tic-Tac-Toe Game</h1>
      <div className="turn-container">
        <p>
          <Mark value="&#128903;" styles="o-mark" />{" "}
          <Mark value="&#10008;" styles="x-mark" />
        </p>
        <p className="turn">
          {nextSymbol ? (
            <Mark value="&#10008;" styles="x-mark" />
          ) : (
            <Mark value="&#128903;" styles="o-mark" />
          )}{" "}
          Turn
        </p>
        <button
          type="reset"
          className="reset"
          id="reset"
          onClick={() => handleReset()}
        >
          <span>&#10226;</span>
        </button>
      </div>
      <div className="btn-container">
        <div>
          <Button value={box_0} onSquareClick={(e) => handleChangeTurn(e, 0)} />
          <Button value={box_1} onSquareClick={(e) => handleChangeTurn(e, 1)} />
          <Button value={box_2} onSquareClick={(e) => handleChangeTurn(e, 2)} />
        </div>
        <div>
          <Button value={box_3} onSquareClick={(e) => handleChangeTurn(e, 3)} />
          <Button value={box_4} onSquareClick={(e) => handleChangeTurn(e, 4)} />
          <Button value={box_5} onSquareClick={(e) => handleChangeTurn(e, 5)} />
        </div>
        <div>
          <Button value={box_6} onSquareClick={(e) => handleChangeTurn(e, 6)} />
          <Button value={box_7} onSquareClick={(e) => handleChangeTurn(e, 7)} />
          <Button value={box_8} onSquareClick={(e) => handleChangeTurn(e, 8)} />
        </div>
      </div>
      {!victor ? (
        <Result header={'YOU LOSE!'} titleRef={titleRef} isLock={lock} victor={victor} />
      ) : (
        <Result header={'YOU WON!'} titleRef={titleRef} isLock={lock} victor={victor} />
      )}
    </div>
  );
}