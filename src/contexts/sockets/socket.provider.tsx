import { useState,useRef, useEffect} from "react";
/** Note: Socket Context */
import {SocketContext} from "./socket.context";
import { io, Socket } from "socket.io-client";
import env from "../../constants/loadEnv/loadEnv";

const SocketProvider= ({children}:any) => {

    const socketRef = useRef<Socket | null>(null);
    const [isConnected,setIsConnected] = useState<boolean>(false);
    const [onlineUsers,setOnlineUsers] = useState<Record<string,string> | null>(null);

    useEffect( () => {

        /** Note: Configrate Socket.io connection. */
        const socket = io(env.SERVER_URL,{withCredentials:true,transports:["websocket"]});
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
            console.log(`Socket connected: ${socket.id}`);
            /** Note: If user successfully connected to sockets.*/
            socket.emit("online-users");
            socket.on("event:online-users",(onlineUser:Record<string,string>) => setOnlineUsers(onlineUser));
        })

        /** Note: Diconnect clean up function. */
        return () => {
            socket.off("online-users");
            socket.off("event:online-users")
            socket.disconnect();
        }
    },[]);

    return (
        <SocketContext.Provider value={{socket: isConnected ? socketRef.current : null,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketProvider;