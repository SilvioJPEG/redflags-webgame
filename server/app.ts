import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Controller from "./types/Controller.interface";
import database from "./models/database";

class App {
  public app: Express;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    const bp = require("body-parser");
    this.app = express();
    this.app.use(bp.json());
    this.app.use(bp.urlencoded({ extended: true }));
    this.port = port;
    this.assertDatabaseConnectionOk();
    this.initializeControllers(controllers);
  }
  private async assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
      await database.authenticate();
      console.log("Database connection OK!");
    } catch (error) {
      console.log("Unable to connect to the database:");
      console.log(error);
      process.exit(1);
    }
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
