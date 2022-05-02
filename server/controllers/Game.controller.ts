import express, { Request, Response } from "express";
import Controller from "../types/Controller.interface";
import Game from "../models/Game";
import Player from "../models/Player";
import { v4 as uuidv4 } from "uuid";
import {
  CreateGameRequest,
  DeleteGameRequest,
  JoinGameRequest,
  updateGameRequest,
} from "../types/gameReq.types";

export class GameController implements Controller {
  public path = "/game";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.create);
    this.router.post(`${this.path}/join/:access_code`, this.joinGame);
    this.router.patch(`${this.path}`, this.updateGame);
    this.router.delete(`${this.path}`, this.deleteGame);
  }

  public async getGameData(req: Request, res: Response) {}

  public async create(req: CreateGameRequest, res: Response) {
    let random_ac: string = "";
    do {
      random_ac = (Math.random() + 1).toString(36).substring(5);
      let game = await Game.findOne({ where: { access_code: random_ac } });
      if (game) {
        break;
      }
    } while (true);

    const newGame = await Game.create({
      access_code: random_ac,
      game_status: "waiting",
    });

    const host = await Player.create({
      id: uuidv4(),
      username: req.body.username,
      host: true,
      game_id: newGame.id,
    });

    res.json({ host, newGame });
  }

  public async joinGame(req: JoinGameRequest, res: Response) {
    const game = await Game.findOne({
      where: { access_code: req.params.asccess_code },
    });
    if (game === null) {
      return res.sendStatus(404);
    } else {
      const newPlayer = await Player.create({
        username: req.body.username,
        host: false,
        game_id: game.id,
      });
      return res.json(newPlayer);
    }
  }

  public async deleteGame(req: DeleteGameRequest, res: Response) {
    const host = await Player.findByPk(req.body.host_id);
    if (host) {
      if (host.host) {
        const game = await Game.findByPk(req.body.game_id);
        if (game) {
          await Player.destroy({ where: { game_id: game.id } });
          game.destroy();
          return res.sendStatus(200);
        }
      } else {
        return res.sendStatus(401);
      }
    }
  }

  public async updateGame(req: updateGameRequest, res: Response) {
    try {
      let game = await Game.findByPk(req.body.id);
      if (game) {
        game = await game.update(req.body);
        return res.json(game);
      }
    } catch (err) {}
  }
}
