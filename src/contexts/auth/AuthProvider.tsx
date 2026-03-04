import { type ReactNode, useState,useEffect } from "react";
import { AuthContext } from "./AuthContext";

/** Types */
import type { UserDocumentInterface } from "../../types/auth/auth.types";
import useUser from "../../hooks/server/auth/useUser";
import { AxiosError } from "axios";

export const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<UserDocumentInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /** Note: Handle Set User Document. */
  const handleSetUser = (user:UserDocumentInterface) => {
      console.log(user);
      setUser(user);
      setIsAuthenticated(true);
  };

  /** Note: Check User is Authenticated */
  const { data, refetch, isLoading} = useUser();

  useEffect( () => {
    const handleFetchAuthenticatedUser = async ():Promise<void> => {
      try {
        refetch();
      } catch (e:any) {
        if(e instanceof AxiosError){
          console.log(e);
        }
      }
    };

    /** Cleanup Timer */
    const timer = setTimeout(handleFetchAuthenticatedUser,100);
    return () => clearTimeout(timer);
  },[isAuthenticated]);

  useEffect( () => {
    if(data){
      console.log(data);
      handleSetUser(data);
    }
  },[data])

  return (
    <AuthContext.Provider value={{handleSetUser,isAuthenticated,user}}>
      {children}
    </AuthContext.Provider>
  );
};