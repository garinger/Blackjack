import { PlayerAction } from "../App";

interface Props {
  action: PlayerAction;
  disabled: boolean;
  onClick: () => void;
}

export default function PlayerActionButton({
  action,
  disabled,
  onClick,
}: Props) {
  let actionText = "";
  let actionStyling = "";

  switch (action) {
    case PlayerAction.Hit:
      actionText = "Hit";
      actionStyling = "bg-red-600";
      break;
    case PlayerAction.Stand:
      actionText = "Stand";
      actionStyling = "bg-gray-600";
      break;
    case PlayerAction.Double:
      actionText = "Double";
      actionStyling = "bg-green-600";
      break;
    case PlayerAction.Split:
      actionText = "Split";
      actionStyling = "bg-purple-600";
      break;
  }

  return (
    <button
      className={`text-white rounded w-20 h-8 ${actionStyling}`}
      disabled={disabled}
      onClick={onClick}
    >
      {actionText}
    </button>
  );
}
