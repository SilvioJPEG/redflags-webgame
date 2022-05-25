import express, { Request, Response } from "express";
import Controller from "../types/Controller.interface";
import { v4 as uuidv4 } from "uuid";
import expressWs, { WebsocketRequestHandler } from "express-ws";

import {
  CreateGameRequest,
  DeleteGameRequest,
  JoinGameRequest,
} from "../types/gameReq.types";
import { Game, Player } from "../models/database";

export class GameController implements Controller {
  public path = "/game";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.ws("/hand", this.wsGameHandler);
    this.router.post(`${this.path}/create`, this.create);
    this.router.post(`${this.path}/join/:accessCode`, this.joinGame);
    this.router.post(`${this.path}/:accessCode`, this.getGameData);
    this.router.patch(`${this.path}`, this.update);
    this.router.delete(`${this.path}`, this.delete);
  }

  public async getGameData(req: Request, res: Response) {}

  private wsGameHandler: WebsocketRequestHandler = (ws, req) => {
    ws.on("new-player", () => {});

    ws.on("kicked", () => {});
  };

  public async create(req: CreateGameRequest, res: Response) {
    try {
      console.log(req.body);
      let random_ac: string = "";
      let isCodeUnique: boolean = false;
      do {
        random_ac = (Math.random() + 1).toString(36).substring(6);
        console.log(random_ac);
        let game = await Game.findOne({ where: { access_code: random_ac } });
        console.log(game);
        if (!game) {
          isCodeUnique = true;
        }
      } while (!isCodeUnique);

      const newGame = await Game.create({
        access_code: random_ac,
        game_status: "waiting",
      });

      const host = await Player.create({
        id: uuidv4(),
        username: req.body.username,
        host: true,
        game_id: newGame.getDataValue("id"),
      });

      res.json({ host, game: newGame });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  public async joinGame(req: JoinGameRequest, res: Response) {
    const game = await Game.findOne({
      where: { access_code: req.params.accessCode },
    });
    if (game === null) {
      res.sendStatus(404);
    } else {
      const newPlayer = await Player.create({
        id: uuidv4(),
        username: req.body.username,
        host: false,
        game_id: game.getDataValue("id"),
      });
      res.json(newPlayer);
    }
  }

  public async delete(req: DeleteGameRequest, res: Response) {
    const host = await Player.findByPk(req.body.host_id);
    if (host) {
      if (host.getDataValue("host")) {
        const game = await Game.findByPk(req.body.game_id);
        if (game) {
          await Player.destroy({ where: { game_id: game.getDataValue("id") } });
          game.destroy();
          return res.sendStatus(200);
        }
      } else {
        return res.sendStatus(401);
      }
    }
  }

  public async update(req: Request, res: Response) {
    try {
      let game = await Game.findByPk(req.body.id);
      if (game) {
        game = await game.update(req.body);
        return res.json(game);
      }
    } catch (err) {}
  }
}
