import { useEffect, useState } from "react";
import Dealer from "./components/Dealer";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import { AnimatePresence } from "framer-motion";

enum CardSuit {
  Clubs = "Clubs",
  Diamonds = "Diamonds",
  Hearts = "Hearts",
  Spades = "Spades",
}

export enum CardFace {
  Ace = "Ace",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
  Seven = "Seven",
  Eight = "Eight",
  Nine = "Nine",
  Ten = "Ten",
  Jack = "Jack",
  Queen = "Queen",
  King = "King",
}

export enum CardValue {
  Ace = 11,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 10,
  Queen = 10,
  King = 10,
}

export type Card = {
  suit: CardSuit;
  face: CardFace;
  value: number;
  hidden?: boolean;
};

export type Player = {
  name: string;
  hand: Card[];
  score: number;
  chips: number;
};

enum PlayerType {
  Dealer = "Dealer",
  Player = "Player",
}

export enum PlayerAction {
  Hit = "Hit",
  Stand = "Stand",
  Double = "Double",
  Split = "Split",
}

type Dealer = {
  hand: Card[];
  score: number;
};

interface GameState {
  turn: PlayerType | null;
  initialDeal: boolean;
  dealersHandRevealed: boolean;
  gameOver: boolean;
  winner: string | null;
}

const houseCards: Card[] = [];

for (const suit in CardSuit) {
  for (const face in CardFace) {
    houseCards.push({
      suit: CardSuit[suit as keyof typeof CardSuit],
      face: CardFace[face as keyof typeof CardFace],
      value: CardValue[face as keyof typeof CardValue],
    });
  }
}

function shuffleCards(cards: Card[]) {
  cards.forEach((card) => (card.hidden = false));

  let shuffled = cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

let shuffledHouseCards = shuffleCards(houseCards);

const timeBetweenDealerActions = 1000;

export default function App() {
  const [player, setPlayer] = useState<Player>({
    name: "Jackson",
    hand: [],
    score: 0,
    chips: 10,
  });
  const [dealer, setDealer] = useState<Dealer>({
    hand: [],
    score: 0,
  });
  const [gameState, setGameState] = useState<GameState>({
    turn: PlayerType.Dealer,
    initialDeal: true,
    dealersHandRevealed: false,
    gameOver: false,
    winner: null,
  });

  useEffect(() => {
    if (gameState.turn === PlayerType.Dealer || gameState.turn === null) {
      setTimeout(() => {
        handleDealerAction();
      }, timeBetweenDealerActions);
    }
  }, [gameState.turn]);

  useEffect(() => {
    if (dealer.score > 21) {
      setGameState({ ...gameState, gameOver: true, winner: player.name });
    } else if (dealer.score >= 17 && player.score < dealer.score) {
      setGameState({ ...gameState, gameOver: true, winner: "Dealer" });
    } else if (dealer.score >= 17 && player.score > dealer.score) {
      setGameState({ ...gameState, gameOver: true, winner: player.name });
    } else if (dealer.score >= 17 && player.score === dealer.score) {
      setGameState({ ...gameState, gameOver: true, winner: "Draw" });
    } else if (player.score > 21) {
      setGameState({ ...gameState, gameOver: true, winner: "Dealer" });
    }
  }, [player, dealer]);

  function handlePlayerAction(action: PlayerAction) {
    switch (action) {
      case PlayerAction.Hit:
        let newCard = DrawCard();
        setPlayer({
          ...player,
          hand: [...player.hand, newCard],
          score: calculateScore([...player.hand, newCard]),
        });
        break;
      case PlayerAction.Stand:
        setGameState({ ...gameState, turn: PlayerType.Dealer });
        break;
    }
  }

  function handleDealerAction() {
    if (gameState.initialDeal === true) {
      // Give 1 card to the player
      let newCard = DrawCard();
      setPlayer({
        ...player,
        hand: [...player.hand, newCard],
        score: calculateScore([...player.hand, newCard]),
      });

      // Give 2 cards to the dealer
      let dealersFirstCard = DrawCard();
      let dealersSecondCard = DrawCard();
      dealersSecondCard.hidden = true;

      setDealer({
        ...dealer,
        hand: [...dealer.hand, dealersFirstCard, dealersSecondCard],
        score: calculateScore([...dealer.hand, dealersFirstCard]),
      });

      // Let the player go
      setGameState({
        ...gameState,
        turn: PlayerType.Player,
        initialDeal: false,
      });
    } else if (gameState.dealersHandRevealed === false) {
      // Unhide the dealer's hidden card
      let dealersHand = dealer.hand;
      dealersHand[1].hidden = false;
      setDealer({
        ...dealer,
        hand: dealersHand,
        score: calculateScore(dealersHand),
      });
      setTimeout(() => {
        while (calculateScore(dealersHand) < 17) {
          dealersHand.push(DrawCard());
        }
        setDealer({
          ...dealer,
          hand: dealersHand,
          score: calculateScore(dealersHand),
        });
        setGameState({
          ...gameState,
          dealersHandRevealed: true,
        });
      }, timeBetweenDealerActions);
    }
  }

  function handlePlayAgain() {
    shuffledHouseCards = shuffleCards(houseCards);
    setGameState({
      turn: null,
      initialDeal: true,
      dealersHandRevealed: false,
      gameOver: false,
      winner: null,
    });
    setPlayer({ ...player, hand: [], score: 0 });
    setDealer({ ...dealer, hand: [], score: 0 });
  }

  function DrawCard() {
    // Get the card from the top of the deck
    let card = shuffledHouseCards.slice(-1)[0];
    // Remove that card from the deck
    shuffledHouseCards = shuffledHouseCards.slice(0, -1);
    //setHouse({ ...house, cards: house.cards.slice(0, -1) });
    // Return the card
    return card;
  }

  function calculateScore(hand: Card[]) {
    // Get all the aces if there are any
    const aces = hand.filter((card) => card.face === CardFace.Ace);
    // Get the rest of the cards
    const nonAces = hand.filter((card) => card.face !== CardFace.Ace);

    let score = 0;
    nonAces.forEach((card) => {
      score += card.hidden ? 0 : card.value;
    });

    aces.forEach((_, i) => {
      let remainingAces = aces.length - 1 - i;
      if (score + 11 + remainingAces <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    });
    return score;
  }

  return (
    <main className="flex flex-col h-screen items-center py-8 gap-8  bg-table">
      <Dealer
        hand={dealer.hand}
        score={dealer.score}
        myTurn={gameState.turn === PlayerType.Dealer}
      />

      <div className="flex h-1/4 justify-center items-center">
        <AnimatePresence>
          {gameState.gameOver && (
            <GameOver
              winner={gameState.winner!}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </AnimatePresence>
      </div>

      <Player
        player={player}
        myTurn={gameState.turn === PlayerType.Player}
        gameOver={gameState.gameOver}
        onPlayerAction={handlePlayerAction}
      />
    </main>
  );
}
