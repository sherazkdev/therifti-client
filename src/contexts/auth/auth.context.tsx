import { createContext, useContext } from "react";
import type { AuthContextType } from "../../types/contexts/index";

/** @note: Creating Context */
export const AuthContext = createContext<AuthContextType>({
    user:null,
    isAuthenticated:false,
    handleSetUser: () => {}
});

/** Note: Auth Provider */
export const useAuth = () => useContext(AuthContext);