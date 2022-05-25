import { BasePlayer, otherHand } from "./game.types";

export type BaseGameData = {
  id: number;
  gameStatus: string;
  access_code: string;
};

export interface GameData extends BaseGameData {
  currentTurn?: {
    id: string;
    username: string;
  };
  judge?: {
    id: string;
    username: string;
  };
  playersList?: BasePlayer[];
  otherPlayersHands?: otherHand[];
}

export type CreateGameResponse = {
  game: BaseGameData;
  host: BasePlayer;
};
