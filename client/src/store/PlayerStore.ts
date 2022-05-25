import { makeAutoObservable } from "mobx";
import { BaseCard, BasePlayer, Perk, Role } from "../types/game.types";

class PlayerStore {
  id: string | null = null;
  username: string | null = null;
  //defines if player has host rights or not
  host: boolean = false;
  status: Role = "waiting";

  pickedCards: Perk[] = [
    { index: 0, card: null },
    { index: 1, card: null },
    { index: 2, card: null },
  ];

  hand: BaseCard[] = [];

  draggingCard: BaseCard | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setUsername(username: string) {
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
    this.id = data.id;
    localStorage.setItem("uuid", data.id);
    localStorage.setItem("username", data.username);
  }

  getHand(): BaseCard[] {
    return this.hand;
  }

  deleteFromHand(card: BaseCard) {
    this.hand = this.hand.filter((el: BaseCard) => el !== card);
  }
  getBasePlayer(): BasePlayer | null {
    if (this.id && this.username) {
      return { id: this.id, username: this.username, host: this.host };
    }
    return null;
  }
}

export default new PlayerStore();
