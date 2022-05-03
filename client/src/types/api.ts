import { BasePlayer, otherHand } from "./game.types";

export type GameData = {
  id: number | null;
  gameStatus: string;
  currentTurn: {
    id: string;
    username: string;
  };
  judge: {
    id: string;
    username: string;
  };
  playersList: BasePlayer[];
  otherPlayersHands: otherHand[];
};
