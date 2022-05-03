import $api from ".";
import PlayerStore from "../store/PlayerStore";
import { BasePlayer } from "../types/game.types";

export default class PlayerService {
  static async getPlayerInfo(uuid: string) {
    const res = await $api.get<BasePlayer>(`/player/${uuid}`);
    PlayerStore.setUserData(res.data);
  }

  static async updatePlayer(uuid: string) {
    const res = await $api.patch(`/player/${uuid}`);
  }
}
