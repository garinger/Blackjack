import { Card as CardType } from "../App";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";

interface Props {
  hand: CardType[];
}

export default function Hand({ hand }: Props) {
  return (
    <div className="flex justify-center gap-3 h-28">
      <AnimatePresence>
        {hand.map((card) => (
          <Card key={`${card.face} of ${card.suit}`} card={card} />
        ))}
      </AnimatePresence>
    </div>
  );
}
