import { Message } from "../models/message";
import {Socket, Server} from "socket.io";
import {ChatWsEventsEnum} from "../constants/chat-ws-events.enum";

/**
 * Send message
 * emit "message"
 */
export const messageController = (socket: Socket, content: any) => {
    const obj = {
        date: new Date(),
        message: content.message,
        username: content.username
    };

    Message.create(obj, (err: Error) => {
        if (err) return console.error("Message", err);
        socket.emit(ChatWsEventsEnum.Message, obj);
        socket.to("all").emit(ChatWsEventsEnum.Message, obj);
    });
};

/**
 * Fetch all messages
 * emit "receiveHistory"
 */
export const receiveHistoryController = (socket: Socket) => {
    Message.find({})
        .sort({ date: -1 })
        .limit(50)
        .sort({ date: 1 })
        .lean()
        .exec((err, messages) => {
            if (!err) {
                socket.emit(ChatWsEventsEnum.History, messages);
            }
        });
};

/**
 * Fetch connected users
 * emit "connected_users"
 */
export const userConnectedController = (io: Server, socket: Socket, user: any) => {
    user.socketId = socket.id;
    (socket as any).user = user;

    const users = Object.values(io.sockets.sockets)
        .filter((socket) => "user" in socket)
        .map((socket: any) => socket.user);

    io.emit(ChatWsEventsEnum.UserConnected, users);
};


