import { makeAutoObservable } from "mobx";
import { BaseCard, BasePlayer, otherHand } from "../types/game.types";
import { GameData } from "../types/api";

class GameStore {
  //saves current player username;
  id: number | null = null;
  access_code: string = "";
  gameStatus: null | "waiting" | "ready" | "in-progress" = null;
  currentTurn: { id: string; username: string } | null = null;
  judge: { id: string; username: string } | null = null;
  playersList: BasePlayer[] = [];

  otherPlayersHands: otherHand[] = [
    { uuid: "Alex Si", perks: 5, flags: 2 },
    { uuid: "Jenny Arts", perks: 5, flags: 2 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setTurn(username: BasePlayer) {
    this.currentTurn = username;
  }

  setNewRound(newJudge: BasePlayer) {
    this.judge = newJudge;
  }

  setGameData(GameData: GameData | null, host?: BasePlayer) {
    if (GameData === null) {
      this.id = null;
      this.access_code = "";
      this.playersList = [];
      this.gameStatus = "waiting";
    } else {
      this.id = GameData.id;
      this.access_code = GameData.access_code;
      if (
        GameData.gameStatus === "ready" ||
        GameData.gameStatus === "in-progress"
      ) {
        this.gameStatus = GameData.gameStatus;
      }
      if (GameData.judge) {
        this.judge = GameData.judge;
      }
      if (GameData.playersList) {
        this.playersList = GameData.playersList;
      }
    }
  }

  getOtherPlayerHand(owner: BasePlayer): BaseCard[] {
    const otherHand = this.otherPlayersHands.find((el) => el.uuid === owner.id);
    if (otherHand) {
      let hand: BaseCard[] = [];
      let i: number = 0;
      while (i < otherHand.perks) {
        hand.push({ type: "perk", description: null });
        i++;
      }
      i = 0;
      while (i < otherHand.flags) {
        hand.push({ type: "flag", description: null });
        i++;
      }
      return hand;
    } else {
      return [];
    }
  }
}

export default new GameStore();
