import { Player as PlayerType, PlayerAction } from "../App";
import Hand from "./Hand";
import PlayerActionButton from "./PlayerActionButton";

interface Props {
  player: PlayerType;
  myTurn: boolean;
  gameOver: boolean;
  onPlayerAction: (action: PlayerAction) => void;
}

export default function Player({
  player,
  myTurn,
  gameOver,
  onPlayerAction,
}: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex justify-center items-center gap-4 px-2">
        <h1 className={`text-lg text-white ${myTurn && "font-bold text-xl"}`}>
          {player.name}
        </h1>
        <p
          className={`text-xl font-semibold ${
            player.score > 21 ? "text-red-600" : "text-white"
          }`}
        >
          {player.score}
        </p>
      </div>
      <Hand hand={player.hand} />
      <div className="flex gap-2 my-4 items-center">
        <PlayerActionButton
          action={PlayerAction.Hit}
          disabled={!myTurn || gameOver}
          onClick={() => onPlayerAction(PlayerAction.Hit)}
        />
        <PlayerActionButton
          action={PlayerAction.Stand}
          disabled={!myTurn || gameOver}
          onClick={() => onPlayerAction(PlayerAction.Stand)}
        />
      </div>
    </div>
  );
}
