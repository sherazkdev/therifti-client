import { type ReactNode, useState,useEffect } from "react";
import { AuthContext } from "./auth.context";

/** Types */
import type { UserDocumentInterface } from "../../types/api";
import useUser from "../../hooks/server/auth/useUser";
import { AxiosError } from "axios";

export const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<UserDocumentInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /** Note: Handle Set User Document. */
  const handleSetUser = (user:UserDocumentInterface) => {
      setUser(user);
      setIsAuthenticated(true);
  };

  /** Note: Check User is Authenticated */
  const { data, refetch} = useUser();

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
  },[]);


  useEffect( () => {
    if(data && data.data){
      handleSetUser(data.data);
    }
  },[data]);

  // useEffect( () => {
  //   console.log(error)
  //   if(error && error.response){
  //     const err = (error.response?.data as ApiError ) || undefined;
  //     if(err){
  //       console.log(err)
  //     }
  //   }
  // },[error])

  return (
    <AuthContext.Provider value={{handleSetUser,isAuthenticated,user}}>
      {children}
    </AuthContext.Provider>
  );
};