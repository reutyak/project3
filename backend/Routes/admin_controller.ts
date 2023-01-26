// All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import admin_logic from "../Logic/admin_logic";
import {
  checkJWT,
  getExpFromJWT,
  getJWT,
  getUserIdFromJWT,
  getUserNameFromJWT,
} from "../Utils/jwt";

// generic router
const admin_router = express.Router();
var hash = require("object-hash");

// gets all admin
admin_router.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await admin_logic.getAllAdmins());
  }
);

//login admin
admin_router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    const detailsAdmin = request.body;
    const admin = await admin_logic.getAllAdmins();
    console.log(admin);
    if (
      detailsAdmin.typeUser === "admin" &&
      hash(detailsAdmin.user_name) === admin[0].admin_name &&
      hash(detailsAdmin.password) === admin[0].admin_code
    ) {
      console.log(detailsAdmin.user_name);
      const token = await getJWT(detailsAdmin.user_name, detailsAdmin.id);
      console.log(token);
      //add token to the system...
      await response.set("Authorization", `Bearer ${token}`);
      console.log("user name:", getUserNameFromJWT(token));
      console.log("exp:", getExpFromJWT(token));
      response.status(202).json(true);
    } else {
      response.status(403).json(false);
    }
  }
);

// add admin to DB
admin_router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = request.body;
    const myAdmin = await admin_logic.getAllAdmins();
    if (myAdmin.length === 0) {
      response.status(201).json(await admin_logic.addAdmin(someData));
    } else {
      response.status(403).json("Admin exists in the system");
    }
  }
);

// delete admin from DB
admin_router.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    if (request.headers.authorization) {
      //create new JWT
      const userName = getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      //return the response
      response.status(204).json(await admin_logic.deleteAdmin(someData));
    } else {
      response.status(401).json("You are no authorized!!!");
    }
  }
);

// update admin in DB
admin_router.put(
  "/update",
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    response.status(201).json(await admin_logic.updateAdmin(body));
  }
);

//vacation part:
//get all vacations
admin_router.get(
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
      response.status(200).json(await admin_logic.getAllVacations());
    } else {
      response.status(401).json("You are no authorized!!!");
    }
  }
);

//get single vacation
admin_router.get(
  "/vacation/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    response.status(200).json(await admin_logic.getSingleVacation(someData));
  }
);

// add vacation
admin_router.post(
  "/vacation/",
  async (request: Request, response: Response, next: NextFunction) => {
    if (
      request.headers.authorization &&
      (await checkJWT(request.headers.authorization))
    ) {
      //create new JWT
      const userName = await getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      //return the response
      const someData = request.body;
      response.status(201).json(await admin_logic.addVacation(someData));
    } else {
      response.status(401).json("You are no authorized!!!");
    }
  }
);

// delete vacation
admin_router.delete(
  "/vacation/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const someData = +request.params.id;
    if (
      request.headers.authorization &&
      (await checkJWT(request.headers.authorization))
    ) {
      //create new JWT
      const userName = getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      //return the response
      response.status(204).json(await admin_logic.deleteVacation(someData));
    } else {
      response.status(401).json(false);
    }
  }
);

// update vacation
admin_router.put(
  "/vacation/update",
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    if (
      request.headers.authorization &&
      (await checkJWT(request.headers.authorization))
    ) {
      //create new JWT
      const userName = getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      response.status(201).json(await admin_logic.updateVacation(body));
    } else {
      response.status(401).json("You are no authorized!!!");
    }
  }
);

// update vacation- just followList
admin_router.put(
  "/vacation/updateFollow",
  async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    if (
      request.headers.authorization &&
      (await checkJWT(request.headers.authorization))
    ) {
      //create new JWT
      const userName = getUserNameFromJWT(request.headers.authorization);
      const userId = getUserIdFromJWT(request.headers.authorization);
      console.log("my user name: ", userName);
      console.log("my user id: ", userId);
      response.set(
        "Authorization",
        `Bearer ${await getJWT(await userName, await userId)}`
      );
      response.status(201).json(await admin_logic.updateVacationFollow(body));
    } else {
      response.status(401).json("You are no authorized!!!");
    }
  }
);

export default admin_router;
