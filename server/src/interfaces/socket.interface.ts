import {Socket} from "socket.io";
import {User} from "./user.interface";

export type SocketWithUser  = Socket & { user: User };
