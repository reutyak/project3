// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import admin_logic from '../Logic/admin_logic';

// generic router 
const admin_router = express.Router();

// gets all admin
admin_router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await admin_logic.getAllAdmins())
})


// add admin to DB
admin_router.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json( await admin_logic.addAdmin(someData))
})

// delete admin from DB
admin_router.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json( await admin_logic.deleteAdmin(someData))
})

// update admin in DB
admin_router.put("/update", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await admin_logic.updateAdmin(body));
})
//vacation part:
//get all vacations
admin_router.get("/vacation/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await admin_logic.getAllVacations())
})
//get single vacation- not necessary
admin_router.get("/vacation/single/:id", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(200).json( await admin_logic.getSingleVacation(someData))
})

// add vacation
admin_router.post("/vacation/", async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json( await admin_logic.addVacation(someData))
})

// delete vacation
admin_router.delete("/vacation/:id", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json( await admin_logic.deleteVacation(someData))
})

// update vacation
admin_router.put("/vacation/update", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await admin_logic.updateVacation(body));
})


export default admin_router;