import { type ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

/** Types */
import type { UserDocumentInterface } from "../../types/auth/auth.types";

export const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<UserDocumentInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /** Note: Handle Set User Document. */
  const handleSetUser = (user:UserDocumentInterface) => {
      setUser(user);
      setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{handleSetUser,isAuthenticated,user}}>
      {children}
    </AuthContext.Provider>
  );
};