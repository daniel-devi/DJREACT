import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const NotAuthenticatedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("TOKEN") !== null
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowWarning(true);
      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect to login after 3 seconds
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated && showWarning) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Access Denied</h2>
        <p style={styles.text}>
          You are authenticated and hence not allowed to view this page.
        </p>
        <p style={styles.text}>Redirecting to the Home page...</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    maxWidth: "600px",
  },
};

export default NotAuthenticatedRoute;
