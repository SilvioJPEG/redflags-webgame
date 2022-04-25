import $api from ".";
import GameStore from "../store/GameStore";
import { GameDataAll } from "../types/api";

export default class GameService {
  static async joinRoom(userId: number) {}

  static async getRoomDataId(roomCode: string) {
    const res = await $api.get<GameDataAll>(`/room/join/${roomCode}/`);
    GameStore.setGameData(res.data);
  }

  
}
