import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./components/Button";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);

  const checkEndTheGame = (currentSquares) => currentSquares.every((square) => square !== "");

  const checkWinner = (currentSquares) => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        console.log(currentSquares); // Log the current state of the squares
        return { winner: currentSquares[a], combo };
      }
    }
    return null;
  };

  const updateSquares = (index) => {
    if (squares[index] || winner) return;

    const updatedSquares = squares.slice();
    updatedSquares[index] = turn;
    setSquares(updatedSquares);

    const result = checkWinner(updatedSquares);
    if (result) {
      setWinner(result.winner);
      setWinningCombo(result.combo);
    } else if (checkEndTheGame(updatedSquares)) {
      setWinner("x | o");
    } else {
      setTurn(turn === "x" ? "o" : "x");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
    setWinningCombo([]);
  };

  return (
    <div className="tic-tac-toe">
      <h1> TIC-TAC-TOE </h1>
      <Button resetGame={resetGame} />
      <div className="game">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={index}
            updateSquares={updateSquares}
            clsName={squares[index]}
            isWinningSquare={winningCombo.includes(index)}
          />
        ))}
      </div>
      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text"
            >
              <motion.h2
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: { delay: 0.7 },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "x | o" ? "No Winner" : "Winner"}
              </motion.h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "x | o" ? (
                  <>
                    <Square clsName="x" />
                    <Square clsName="o" />
                  </>
                ) : (
                  <>
                    <Square clsName={winner} />
                  </>
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
              >
                <Button resetGame={resetGame} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
