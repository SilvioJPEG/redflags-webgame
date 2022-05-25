import express, { Request, Response } from "express";
import expressWs from "express-ws";
import { Player } from "../models/database";
import Controller from "../types/Controller.interface";
import { getPlayerRequest, updateUserRequest } from "../types/playerReq.types";

export class PlayerController implements Controller {
  public path = "/player";
  public router = express.Router() as expressWs.Router;

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getPlayerById);
    // websockets
    this.router.ws("", (ws, req) => {
      ws.on("update", () => {
        console.log(req.body);
      });
    });
  }

  constructor() {
    this.initializeRoutes();
  }

  public update(ws: WebSocket, req: Request) {}

  public async getPlayerById(req: getPlayerRequest, res: Response) {
    const player = await Player.findByPk(req.params.uuid);
    if (player) {
      res.json(player);
    } else {
      res.sendStatus(404);
    }
  }
}
