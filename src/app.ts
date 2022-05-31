import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Logger } from "./utils/logger";
import Routes from "./routes/routes";
import { userRouter } from "../src/routes/user";

class App {
  public express: express.Application;
  public logger: Logger;

  public users: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
    this.users = [
      { id: 1, firstName: "Test", lastName: "User", userName: "testUser1" },
      {
        id: 2,
        firstName: "Second",
        lastName: "Test User",
        userName: "testUser2",
      },
    ];
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {
    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    //user route
    this.express.use("/api/users", userRouter);

    //handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
