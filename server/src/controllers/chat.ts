import { Message } from "../models/message";
import {Socket, Server} from "socket.io";
import {ChatWsEventsEnum} from "../constants/chat-ws-events.enum";
import {User} from "../interfaces/user.interface";
import {UserMessage} from "../interfaces/message.interface";
import {SocketWithUser} from "../interfaces/socket.interface";

/**
 * Sends message
 * emit "message"
 */
export const messageController = (socket: Socket, userMessage: UserMessage) => {
    const obj = {
        date: new Date(),
        message: userMessage.message,
        username: userMessage.username
    };

    Message.create(obj, (err: Error) => {
        if (err) return console.error("Message", err);
        socket.emit(ChatWsEventsEnum.Message, obj);
        socket.to("all").emit(ChatWsEventsEnum.Message, obj);
    });
};

/**
 * Fetches all messages
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
 * Fetches connected users
 * emit "connected_users"
 */
export const userConnectedController = (io: Server, socket: SocketWithUser, user: User) => {
    user.socketId = socket.id;
    socket.user = user;

    const users = Object.values(io.sockets.sockets)
        .filter((s: SocketWithUser) => "user" in s)
        .map((s: SocketWithUser) => s.user);

    io.emit(ChatWsEventsEnum.UserConnected, users);
};

/**
 * Emits on disconnect user and emit "connected_users" event with updated list.
 */
export const userDisconnectController = (io: Server) => {
    const users = Object.values(io.sockets.sockets)
        .filter((socket: SocketWithUser) => "user" in socket)
        .map((socket: SocketWithUser) => socket.user);

    io.emit(ChatWsEventsEnum.UserConnected, users);
};
