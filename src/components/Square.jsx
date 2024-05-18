import "./Square.scss";
import { motion } from "framer-motion";

const Square = ({ value, updateSquares, clsName, isWinningSquare }) => {
  const handleClick = () => {
    if (!clsName && !isWinningSquare) {
      updateSquares(value);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`square ${clsName} ${isWinningSquare ? "winner_line" : ""}`}
      onClick={handleClick}
    >
      {clsName && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={clsName}
        ></motion.span>
      )}
    </motion.div>
  );
};

export default Square;
