import type { Socket } from "socket.io-client";

/** Note: Socket Context Interface */
export interface SocketContextInterface {
    socket:Socket | null,
    onlineUsers:Record<string,string> | null
}