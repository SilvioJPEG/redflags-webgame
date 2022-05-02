import { Request, Response } from "express";

export interface updateUserRequest extends Request {
  params: {
    asccess_code: string;
  };
  body: {
    username: string;
  };
}

export interface getPlayerRequest extends Request {
  params: {
    uuid: string;
  };
}
