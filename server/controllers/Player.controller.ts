import express, { Request, Response } from "express";
import { Player } from "../models/Player";
import Controller from "../types/Controller.interface";
import { getPlayerRequest, updateUserRequest } from "../types/playerReq.types";

export class PlayerController implements Controller {
  public path = "/player";
  public router = express.Router();

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getPlayerById);
    this.router.patch(`${this.path}/update/`, this.updateUser);
  }

  constructor() {
    this.initializeRoutes();
  }

  public updateUser(req: updateUserRequest, res: Response) {}

  public async getPlayerById(req: getPlayerRequest, res: Response) {
    const player = await Player.findByPk(req.params.uuid);
    if (player) {
      res.json(player);
    } else {
      res.sendStatus(404);
    }
  }
}
