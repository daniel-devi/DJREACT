import React, {useState} from "react";
import { Typography } from "@mui/material";
import RegisterForm from "@/components/AuthForms/RegisterForm";
import StatusChip from "@/components/StatusChip";

const RegisterPage: React.FC = () => {
  const [showChip, setShowChip] = useState(false);
  const handleRegistrationSuccess = () => {
    setShowChip(true);
    //window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col">
      {showChip && (
        <StatusChip type="success" message="Registration successful!" />
      )}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h4" component="h1" className="text-center mb-6">
          Register
        </Typography>
        <RegisterForm onSuccess={handleRegistrationSuccess} />
        <Typography variant="body2" className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;