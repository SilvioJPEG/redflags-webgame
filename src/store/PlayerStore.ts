import { makeAutoObservable } from "mobx";
import { BaseCard, Perk } from "../types";

class PlayerStore {
  username: string = "";
  //defines if player has host rights or not
  host: boolean = false;
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

  }
}

export default new PlayerStore();
