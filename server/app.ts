import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Controller from "./types/Controller.interface";

class App {
  public app: Express;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeControllers(controllers);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on url: http://localhost:${this.port}`);
    });
  }
}

export default App;
