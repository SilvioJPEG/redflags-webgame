import $api from ".";
import GameStore from "../store/GameStore";
import { GameDataAll } from "../types/api";

export default class GameService {
  static async createRoom() {
    const res = await $api.post(`/game/create`);
  }

  static async joinRoom(userId: number, roomCode: string) {
    const res = await $api.post<GameDataAll>(`/game/join/${roomCode}/`, {
      user_id: userId,
    });
    GameStore.setGameData(res.data);
  }

  static async getRoomData(roomCode: string) {
    const res = await $api.get<GameDataAll>(`/game/${roomCode}`);
    GameStore.setGameData(res.data);
  }

  static async deleteGameRoom(roomId: number) {
    const res = await $api.delete(`game/${roomId}/`);
    if (res.status === 200) {
      GameStore.setGameData(null);
    }
  }
}
