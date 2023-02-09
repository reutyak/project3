// Main file in the SERVER
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import admin_router from "./Routes/admin_controller";
import user_router from "./Routes/user_controller";
import sql_init from "./sql/init";
require("dotenv").config();
const fileUpload = require("express-fileupload");

const server = express();
sql_init();

//cors option
var corsOptions = {
  origin: "*",
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
server.use(
  fileUpload({
    createParentPath: true,
  })
);
const PORT = process.env.NODE_DOCKER_PORT || 8080;
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
