// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import admin_router from "./Routes/admin_controller";
import user_router from "./Routes/user_controller";
import sql_init from "./sql/init";
import config from "./Utils/config";


const server = express();
sql_init();
const currentPort = config.port;
server.use(cors());
server.use(express.json());
server.use("/admin",admin_router);
server.use("/user",user_router);
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )