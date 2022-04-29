import { Hand } from "./game.types";

export type BaseGameData = {
  id: number | null;
  gameStatus: string;
  currentTurn: string;
  judge: string;
  playersList: string[];
};

export interface GameDataAll extends BaseGameData {
  hands: Hand[];
}
