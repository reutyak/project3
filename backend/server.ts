// Main file in the SERVER
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import admin_router from "./Routes/admin_controller";
import user_router from "./Routes/user_controller";
import sql_init from "./sql/init";
import config from "./Utils/config";

const fileUpload = require("express-fileupload");
// const bodyParser = require('body-parser');

const server = express();
sql_init();
const currentPort = config.port;
server.use(cors());
//cors option
var corsOptions = {
  origin: "*", //expose to all server around the world
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //expose which methods are allowed
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: "Authorization", //expose the Authorization header
};

server.use(cors(corsOptions));
server.use(express.json());
server.use("/admin", admin_router);
server.use("/user", user_router);
server.use("*", ErrorHandler);
// server.use(express.json());
server.use(express.static("vacation_img"));
//enable file uploading , and create a path for the files if it not exists
server.use(
  fileUpload({
    createParentPath: true,
  })
);
server.listen(currentPort, () => {
  console.log(`listening on http://localhost:${currentPort}`);
});
