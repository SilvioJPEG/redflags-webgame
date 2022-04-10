import { makeAutoObservable } from "mobx";
import { Position } from "../types";

class CursorStore {
  pos: Position = { x: 0, y: 0 };
  mouseDown: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeMouseState(newState: boolean) {
    this.mouseDown = newState;
  }
  changeMousePos(newPosition: Position) {
    this.pos = newPosition;
  }
}

export default new CursorStore();
