import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";

import {MONGODB_URI} from "./util/secrets";
import socket, {Socket} from "socket.io";
import http from "http";
import {messageController, receiveHistoryController, userConnectedController} from "./controllers/chat";
import {ChatWsEventsEnum} from "./constants/chat-ws-events.enum";

// Create Express server
const app = express();

const server = http.createServer(app);
const io = socket(server);

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ })
    .catch((err: string) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
    });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use("*", express.static(path.join(__dirname, "../../client/dist/client")));

// Chat routes
io.on("connection", (socket: Socket) => {
    socket.join("all");
    socket.on(ChatWsEventsEnum.Message, (content: any) => messageController(socket, content));
    socket.on(ChatWsEventsEnum.ReceiveHistory, () => receiveHistoryController(socket));
    socket.on(ChatWsEventsEnum.UserConnected, (user) => userConnectedController(io, socket, user));
});

export { app, server };
