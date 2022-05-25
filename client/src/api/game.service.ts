import $api from ".";
import GameStore from "../store/GameStore";
import PlayerStore from "../store/PlayerStore";
import { CreateGameResponse, GameData } from "../types/api";

export default class GameService {
  static async createRoom(username: string) {
    const res = await $api.post<CreateGameResponse>(`/game/create`, {
      username,
    });
    GameStore.setGameData(res.data.game);
    localStorage.setItem("game:uuid", JSON.stringify(res.data.game.id));
    localStorage.setItem(
      "game:access_code",
      JSON.stringify(res.data.game.access_code)
    );
    PlayerStore.setUserData(res.data.host);
    localStorage.setItem("player:id", res.data.host.id);
    localStorage.setItem("player:username", res.data.host.username);
  }

  static async joinRoom(playerId: string, roomCode: string) {
    const res = await $api.post<GameData>(`/game/join/${roomCode}/`, {
      user_id: playerId,
    });
    GameStore.setGameData(res.data);
  }

  static async getGameData(playerId: string, accessCode: string) {
    const res = await $api.post<GameData>(`/game/${accessCode}/`, {
      user_id: playerId,
    });
    GameStore.setGameData(res.data);
  }

  static async deleteGame(hostId: string, roomId: string) {
    const res = await $api.delete(`game/${roomId}/`, {
      data: {
        host_id: hostId,
      },
    });
    if (res.status === 200) {
      GameStore.setGameData(null);
    }
  }

  static async changeGame(uuid: string) {
    const res = await $api.patch(`game/${uuid}`, {
      data: {},
    });
  }
}
