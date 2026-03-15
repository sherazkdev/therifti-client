import { createContext, useContext, type Context } from "react";

/** Socket Context Types */
import type { SocketContextInterface } from "../../types/contexts/index";

/** Note: Socket Context */
export const SocketContext:Context<SocketContextInterface> = createContext<SocketContextInterface>({socket:null,onlineUsers:null});

/** Note: Socket Provider */
export const useSockets = () =>  useContext(SocketContext);