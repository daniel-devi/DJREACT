import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface DisallowIfAuthenticatedProps {
  children: React.ReactNode;
}

const DisallowIfAuthenticated: React.FC<DisallowIfAuthenticatedProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setOpen(true);
      setTimeout(() => {
        handleRedirect();
      }, 8000);
    }
  }, [accessToken]);

  const handleRedirect = () => {
    setOpen(false);
    navigate("/", { replace: true });
  };

  if (accessToken)
    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Already Logged In</AlertDialogTitle>
            <AlertDialogDescription>
              You are already authenticated. Redirecting you to the homepage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleRedirect}>
              Go to Homepage
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  return <>{children}</>;
};

export default DisallowIfAuthenticated;
