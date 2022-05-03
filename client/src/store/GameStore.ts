import { makeAutoObservable } from "mobx";
import { BaseCard, BasePlayer, otherHand } from "../types/game.types";
import { GameData } from "../types/api";

class GameStore {
  //saves current player username;
  roomId: number | null = null;
  gameStatus: "waiting" | "ready" | "in-progress" = "waiting";
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

  setGameData(GameData: GameData | null) {
    if (GameData === null) {
      this.roomId = null;
      this.playersList = [];
      this.gameStatus = "waiting";
    } else {
      this.roomId = GameData.id;
      if (
        GameData.gameStatus === "ready" ||
        GameData.gameStatus === "in-progress"
      ) {
        this.gameStatus = GameData.gameStatus;
      }
      this.judge = GameData.judge;
      this.playersList = GameData.playersList;
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
