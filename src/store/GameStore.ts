import { makeAutoObservable } from "mobx";

class GameStore {
  //saves current player username;

  itsTurn: string = "Alex Si";
  picker: string = "Selen Uni";
  constructor() {
    makeAutoObservable(this);
  }
  setTurn(username: string) {
    this.itsTurn = username;
  }
}

export default new GameStore();
