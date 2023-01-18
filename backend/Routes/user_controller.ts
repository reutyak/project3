// All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import user_logic from "../Logic/user_logic";
import {
  checkJWT,
  getExpFromJWT,
  getJWT,
  getUserIdFromJWT,
  getUserNameFromJWT,
} from "../Utils/jwt";

// generic router
const user_router = express.Router();
var hash = require("object-hash");

// gets all
user_router.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await user_logic.getAllUsers());
  }
);

user_router.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    response.status(200).json(await user_logic.getSingleUser(someData));
  }
);

// sends information to DB
user_router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = request.body;
    response.status(201).json(await user_logic.addUser(someData));
  }
);

// delete information from DB
user_router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    response.status(204).json(await user_logic.deleteUser(someData));
  }
);

// update information in DB
user_router.put(
  "/update",
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    response.status(201).json(await user_logic.updateUser(body));
  }
);

//get all vacations
user_router.get(
  "/vacation/all",
  async (request: Request, response: Response, next: NextFunction) => {
    if (
      request.headers.authorization &&
      (await checkJWT(request.headers.authorization))
    ) {
      const userName = getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      //return the response
      response.status(200).json(await user_logic.getAllVacations());
    } else {
      response.status(401).json("You are no authorized!!!");
    }
    response.status(200).json(await user_logic.getAllVacations());
  }
);
//get single vacation- not necessary
user_router.get(
  "/vacation/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    response.status(200).json(await user_logic.getSingleVacation(someData));
  }
);

// admin_router.post("/login", async (request: Request, response: Response, next: NextFunction)=>{
//   const detailsAdmin = request.body;
//   const admin = await admin_logic.getAllAdmins();
//   console.log(admin);
//   if(detailsAdmin.typeUser === "admin" && hash(detailsAdmin.user_name) === admin[0].admin_name && hash(detailsAdmin.password) === admin[0].admin_code){
//   console.log(detailsAdmin.user_name);
//   console
//   const token = await getJWT(detailsAdmin.user_name,detailsAdmin.id);
//   console.log(token);
//   //add token to the system...
//   await response.set("Authorization",`Bearer ${token}`);
//         console.log("user name:",getUserNameFromJWT(token));
//         console.log("exp:",getExpFromJWT(token));
//         response.status(202).json(true);
// }else{response.status(403).json(false)};
// });
//login user
user_router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    const detailsUser = request.body;
    const users = await user_logic.getAllUsers();
    let checkMe = false;
    // console.log(admin);
    users.map(async (item) => {
      if (
        detailsUser.typeUser === "user" &&
        hash(detailsUser.user_name) === item.user_name &&
        hash(detailsUser.password) === item.password
      ) {
        console.log(detailsUser.user_name);
        detailsUser.id = item.id;
        checkMe = true;
      }
    });
    //   const token = await getJWT(detailsUser.user_name,detailsUser.id);
    //   console.log(token);
    //   //add token to the system...
    //   await response.set("Authorization",`Bearer ${token}`);
    //         console.log("user name:",getUserNameFromJWT(token));
    //         console.log("exp:",getExpFromJWT(token));
    //         response.status(202).json(true);
    // }else{response.status(403).json(false)};
    if (checkMe) {
      const token = await getJWT(detailsUser.user_name, detailsUser.id);
      console.log(token);
      //add token to the system...
      await response.set("Authorization", `Bearer ${token}`);
      console.log("user name:", getUserNameFromJWT(token));
      console.log("exp:", getExpFromJWT(token));
      response.status(202).json(detailsUser.id);
    } else {
      response.status(403).json(false);
    }
  }
);

export default user_router;
