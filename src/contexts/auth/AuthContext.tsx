import { createContext } from "react";
import type { AuthContextType } from "../../types/auth/auth.types";

/** @note: Creating Context */
export const AuthContext = createContext<AuthContextType>({
    user:null,
    isAuthenticated:false,
    handleSetUser: () => {}
});
