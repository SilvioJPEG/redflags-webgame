import App from "./app";
import dotenv from "dotenv";
import { GameController } from "./controllers/Game.controller";
import { PlayerController } from "./controllers/Player.controller";

dotenv.config();
const port: number = Number(process.env.PORT);
const app = new App([
  new GameController(), 
  new PlayerController()
], port);

app.listen();
