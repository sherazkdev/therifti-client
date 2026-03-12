import { createContext } from "react";
import type { AuthContextType } from "../../types/contexts/index";

/** @note: Creating Context */
export const AuthContext = createContext<AuthContextType>({
    user:null,
    isAuthenticated:false,
    handleSetUser: () => {}
});
