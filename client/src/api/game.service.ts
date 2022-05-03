import $api from ".";
import GameStore from "../store/GameStore";
import PlayerStore from "../store/PlayerStore";
import { GameData } from "../types/api";

export default class GameService {
  static async createRoom() {
    const res = await $api.post<GameData>(`/game/create`);
  }

  static async joinRoom(userId: string, roomCode: string) {
    const res = await $api.post<GameData>(`/game/join/${roomCode}/`, {
      user_id: userId,
    });
    GameStore.setGameData(res.data);
  }

  static async getRoomData(userId: string, roomCode: string) {
    const res = await $api.post<GameData>(`/game/${roomCode}/`, {
      user_id: userId,
    });
    GameStore.setGameData(res.data);
  }

  static async deleteGameRoom(host_id: string, room_id: string) {
    const res = await $api.delete(`game/${room_id}/`, {
      data: {
        host_id: host_id,
      },
    });
    if (res.status === 200) {
      GameStore.setGameData(null);
    }
  }
}
