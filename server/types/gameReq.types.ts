import { Request, Response } from "express";

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
    accessCode: string;
  };
  body: {
    username: string;
  };
}

type otherHand = {
  username: string;
  perks: number;
  flags: number;
};

export interface getGameResponse extends Response {
  body: {
    id: number;
    gameStatus: string;
    currentTurn: {
      id: string;
      username: string;
    };
    judge: {
      id: string;
      username: string;
    };
    host: {
      id: string;
      username: string;
    };
    playersList: string[];
    otherPlayersHands: otherHand[];
  };
}
