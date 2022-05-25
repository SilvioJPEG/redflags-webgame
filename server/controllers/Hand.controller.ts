import express, { Request, Response } from "express";
import expressWs, { WebsocketRequestHandler } from "express-ws";
import { Player } from "../models/database";
import Controller from "../types/Controller.interface";

export class PlayerController implements Controller {
  public path = "/";
  public router = express.Router() as expressWs.Router;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // websockets
    this.router.ws("/hand", this.wsHandHandler);
    this.router.ws("/pickedCards", this.wsPickedCardsHandler);
  }
  private wsHandHandler: WebsocketRequestHandler = (ws, req) => {
    ws.on("update", () => {});

    ws.on("set", () => {});
  };

  wsPickedCardsHandler: WebsocketRequestHandler = (ws, req) => {
    ws.on("update", () => {});
  };
}
