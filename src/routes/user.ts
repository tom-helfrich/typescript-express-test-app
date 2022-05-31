// import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../utils/logger";
import * as UserService from "../services/user";
import { BaseUser, User } from "../models/user";

const logger = new Logger();

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  logger.info(req.url);
  try {
    const users: User[] = await UserService.getAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user: User = await UserService.getUserById(req.params.id);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user: BaseUser = req.body;

    const newUser = await UserService.createUser(user);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const userUpdate: User = req.body;

    const existingUser: User = await UserService.getUserById(req.params.id);

    if (existingUser) {
      const updatedUser = await UserService.updateUser(
        req.params.id,
        userUpdate
      );
      return res.status(200).json(updatedUser);
    }

    const newUser = await UserService.createUser(userUpdate);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// class User {
//   public express: express.Application;
//   public logger: Logger;

//   // array to hold users
//   public users: any[];

//   constructor() {
//     this.express = express();
//     this.middleware();
//     this.routes();
//     this.users = [
//       { id: 1, firstName: "Test", lastName: "User", userName: "testUser1" },
//       {
//         id: 2,
//         firstName: "Second",
//         lastName: "Test User",
//         userName: "testUser2",
//       },
//     ];
//     this.logger = new Logger();
//   }

//   // Configure Express middleware.
//   private middleware(): void {
//     this.express.use(bodyParser.json());
//     this.express.use(bodyParser.urlencoded({ extended: false }));
//   }

//   private routes(): void {
//     // request to get all the users
//     this.express.get("/users", (req, res, next) => {
//       this.logger.info(`URL: ${req.url}`);
//       res.json(this.users);
//     });

//     // request to get all the users by id
//     this.express.get("/users/:id", (req, res, next) => {
//       this.logger.info(`URL: ${req.url}`);
//       const user = this.users.filter(function (user) {
//         if (req.params.id === user.id) {
//           return user;
//         }
//       });
//       res.json(user);
//     });

//     // request to post the user
//     // req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
//     this.express.post("/user", (req, res, next) => {
//       this.logger.info(`URL: ${req.url}`);
//       this.users.push(req.body);
//       res.json(this.users);
//     });
//   }
// }

// export default new User().express;
