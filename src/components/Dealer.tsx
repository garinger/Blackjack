import { Card } from "../App";
import Hand from "./Hand";

interface Props {
  hand: Card[];
  score: number;
  myTurn: boolean;
}

export default function Dealer({ hand, score, myTurn }: Props) {
  return (
    <div className="h-1/4 flex flex-col gap-2 items-center">
      <div className="flex justify-center items-center gap-4 px-2">
        <h1 className={`text-lg text-white ${myTurn && "font-bold text-xl"}`}>
          Dealer
        </h1>
        <p
          className={`text-xl font-semibold ${
            score > 21 ? "text-red-600" : "text-white"
          }`}
        >
          {score}
        </p>
      </div>
      <Hand hand={hand} />
    </div>
  );
}
