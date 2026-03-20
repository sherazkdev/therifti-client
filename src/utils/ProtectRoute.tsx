import React from "react";
import { Navigate } from "react-router-dom"; // react-router-dom v6+
import { useAuth } from "../contexts/auth/auth.context"; // assume your hook

import useUser from "../hooks/server/auth/useUser";
import Loader from "../components/UI/Loader/Loader";
interface ProtectRoutePropsInterface {
  children: React.ReactNode;
}

const ProtectRoute: React.FC<ProtectRoutePropsInterface> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const {isLoading} = useUser();


  if (user && isAuthenticated ) {
    /** Note: If user authenticated render components. */
    return <>{children}</>;
  };

  
  /** Note: If user is not authecticated redirect to login. */
  return <Navigate to="/login" replace />;

};

export default ProtectRoute;