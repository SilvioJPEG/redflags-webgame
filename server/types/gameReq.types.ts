import { Request, Response } from "express";
import Game from "../models/Game";

export interface updateGameRequest extends Request {
  body: Game;
}

export interface DeleteGameRequest extends Request {
  body: {
    host_id: string;
    game_id: number;
  };
}

export interface CreateGameRequest extends Request {
  body: {
    username: string;
  };
}

export interface JoinGameRequest extends Request {
  params: {
    asccess_code: string;
  };
  body: {
    username: string;
  };
}
