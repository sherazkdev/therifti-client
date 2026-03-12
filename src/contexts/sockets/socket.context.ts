import { createContext, type Context } from "react";

/** Socket Context Types */
import type { SocketContextInterface } from "../../types/contexts/index";

const SocketContext:Context<SocketContextInterface> = createContext<SocketContextInterface>({socket:null});

export default SocketContext;