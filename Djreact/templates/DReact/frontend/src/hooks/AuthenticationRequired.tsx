import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return (
      <Navigate
        to={`/login?ref=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
