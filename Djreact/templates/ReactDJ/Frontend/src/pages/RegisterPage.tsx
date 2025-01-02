import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import RegisterForm from "@/components/AuthForms/RegisterForm";
import StatusChip from "@/components/StatusChip";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [showChip, setShowChip] = useState(false);
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    setShowChip(true);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 flex-col">
      {showChip && (
        <StatusChip type="success" message="Registration successful!" />
      )}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <Typography
          variant="h5"
          component="h1"
          className="text-center mb-4 font-semibold text-gray-800"
        >
          Register
        </Typography>
        <RegisterForm onSuccess={handleRegistrationSuccess} />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
        <Typography
          variant="body2"
          className="text-center mt-4 text-gray-600"
        >
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;