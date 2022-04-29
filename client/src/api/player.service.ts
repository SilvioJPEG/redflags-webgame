import $api from ".";
import PlayerStore from "../store/PlayerStore";
import { BasePlayer } from "../types/game.types";

export default class PlayerService {
  static async getPlayerInfo(id: number) {
    const res = await $api.get<BasePlayer>(`/player/${id}`);
    PlayerStore.setUserData(res.data);
  }

  static async updatePlayer(id: number) {
    const res = await $api.patch(`/player/${id}`);
  }
}
