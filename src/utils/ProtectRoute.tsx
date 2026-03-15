import React from "react";
import { Navigate } from "react-router-dom"; // react-router-dom v6+
import { useAuth } from "../contexts/auth/auth.context"; // assume your hook

interface ProtectRoutePropsInterface {
  children: React.ReactNode;
}

const ProtectRoute: React.FC<ProtectRoutePropsInterface> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    /** Note: If user is not authecticated redirect to login. */
    return <Navigate to="/login" replace />;
  }

  /** Note: If user authenticated render components. */
  return <>{children}</>;
};

export default ProtectRoute;