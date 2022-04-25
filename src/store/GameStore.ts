import { makeAutoObservable } from "mobx";
import { BaseCard, Hand } from "../types/game.types";
import { GameDataAll } from "../types/api";

class GameStore {
  //saves current player username;
  roomId: string | null = null;
  gameStatus: "ready" | "in-progress" = "ready";
  currentTurn: string = "Alex Si";
  judge: string = "Selen Uni";
  playersList: string[] = ["Alex Si", "Jenny Arts", "Selen Un"];
  hands: Hand[] = [
    {
      username: "Alex Si",
      cardsInHand: [
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "flags", cardText: null },
        { type: "flags", cardText: null },
      ],
    },
    {
      username: "Jenny Arts",
      cardsInHand: [
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "perks", cardText: null },
        { type: "flags", cardText: null },
        { type: "flags", cardText: null },
      ],
    },
    {
      username: "Selen Un",
      cardsInHand: [
        { type: "perks", cardText: "Owns your favorite sports team" },
        { type: "perks", cardText: "Generous" },
        { type: "perks", cardText: "Travels a lot" },
        { type: "flags", cardText: "still uses a flip phone" },
        {
          type: "flags",
          cardText: "Knocks things out of strangers’ hands",
        },
      ],
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }

  setTurn(username: string) {
    this.currentTurn = username;
  }

  setNewRound(newJudge: string) {
    this.judge = newJudge;
  }

  deleteFromHand(card: BaseCard, username: string) {
    let hand = this.hands.find((el: Hand) => el.username === username);
    if (hand) {
      let reducedCards = hand.cardsInHand.filter((el: BaseCard) => el !== card);
      hand.cardsInHand = reducedCards;
    }
  }
  setGameData(GameData: GameDataAll) {
    this.roomId = GameData.roomId;
    if (
      GameData.gameStatus === "ready" ||
      GameData.gameStatus === "in-progress"
    ) {
      this.gameStatus = GameData.gameStatus;
    }
    this.judge = GameData.judge;
    this.playersList = GameData.playersList;
    this.hands = GameData.hands;
  }
}

export default new GameStore();
