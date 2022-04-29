import { makeAutoObservable } from "mobx";
import { Position } from "../types/game.types";

class CursorStore {
  pos: Position = { x: 0, y: 0 };
  mouseDown: boolean = false;
  dropZoneIndex: number | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  changeMouseState(newState: boolean) {
    this.mouseDown = newState;
  }
  changeMousePos(newPosition: Position) {
    this.pos = newPosition;
  }

  setDropZoneIndex(index: number | null) {
    this.dropZoneIndex = index;
  }
}

export default new CursorStore();
