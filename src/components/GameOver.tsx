import { motion } from "framer-motion";

interface Props {
  winner: string | null;
  onPlayAgain: () => void;
}

export default function GameOver({ winner, onPlayAgain }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
    >
      <div className={"flex flex-col gap-2 items-center"}>
        <h1 className="text-white text-6xl font-extrabold">Game Over</h1>
        <p className="text-white text-lg">{`${
          winner === "Draw" ? winner : `${winner} wins`
        }!`}</p>
        <button
          className="bg-gray-600 text-white rounded w-24 h-8"
          onClick={() => onPlayAgain()}
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}
