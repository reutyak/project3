// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import user_logic from '../Logic/user_logic';


// generic router 
const user_router = express.Router();
// gets all
user_router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await user_logic.getAllUsers())
})

user_router.get("/single/:id", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(200).json( await user_logic.getSingleUser(someData))
})

// sends information to DB
user_router.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json( await user_logic.addUser(someData))
})

// delete information from DB
user_router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json( await user_logic.deleteUser(someData))
})

// update information in DB
user_router.put("/update", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await user_logic.updateUser(body));
})



export default user_router;