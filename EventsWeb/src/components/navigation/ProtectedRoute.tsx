import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { StateProps } from "../../store/store.ts";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
