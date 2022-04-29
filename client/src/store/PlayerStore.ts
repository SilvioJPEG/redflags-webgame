import { makeAutoObservable } from "mobx";
import { BaseCard, BasePlayer, Perk, Role } from "../types/game.types";

class PlayerStore {
  id: number | null = null;
  username: string = "";
  //defines if player has host rights or not
  host: boolean = false;
  status: Role = "waiting";
  pickedCards: Perk[] = [
    { index: 0, card: null },
    { index: 1, card: null },
    { index: 2, card: null },
  ];
  draggingCard: BaseCard | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setDraggingCard(card: BaseCard | null) {
    this.draggingCard = card;
  }

  setPickedCards(index: number, card: BaseCard) {
    this.pickedCards[index] = { index: index, card: card };
  }

  getPickedCard(index: number): BaseCard | null {
    return this.pickedCards[index].card;
  }

  setUserData(data: BasePlayer) {
    this.username = data.username;
    this.host = data.host;
    this.id = data.id;
    this.status = data.status;
  }
}

export default new PlayerStore();
