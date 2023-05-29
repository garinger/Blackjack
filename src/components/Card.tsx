import { CardFace, Card as CardType } from "../App";
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  const textColor =
    card.suit === "Hearts" || card.suit === "Diamonds"
      ? "text-red-600"
      : "text-black";

  const suitIcon =
    card.suit === "Clubs" ? (
      <BsSuitClubFill className={"fill-black"} size={20} />
    ) : card.suit === "Diamonds" ? (
      <BsSuitDiamondFill className={"fill-red-600"} size={20} />
    ) : card.suit === "Hearts" ? (
      <BsSuitHeartFill className={"fill-red-600"} size={20} />
    ) : (
      <BsSuitSpadeFill className={"fill-black"} size={20} />
    );

  const valueText =
    card.face === CardFace.Ace ||
    card.face === CardFace.Jack ||
    card.face === CardFace.Queen ||
    card.face === CardFace.King
      ? card.face[0]
      : card.value;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 5 }}
      transition={{
        duration: 0.4,
        layout: { duration: 0.2 },
      }}
      exit={{ opacity: 0, y: -5 }}
    >
      <div
        className={`rounded-lg w-20 h-28 flex flex-col px-1 ${
          card.hidden ? "bg-red-600 border-white border-4" : "bg-white"
        }`}
      >
        {!card.hidden && (
          <>
            <p className={`text-lg font-bold ${textColor}`}>{valueText}</p>
            <div className="self-center grow flex items-center">
              <div>{suitIcon}</div>
            </div>
            <p className={`text-lg font-bold self-end rotate-180 ${textColor}`}>
              {valueText}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
