import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { validateEmail, validatePassword } from "@/utils";
import apiClient from "@/utils/apiClient";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data } = await apiClient.get<boolean>(`/auth/check-email?email=${email}`);
      return data;
    } catch (error) {
      console.error("Error checking email existence", error);
      return false;
    }
  };

  const getAuthToken = async (username: string, password: string) => {
    try {
      const response = await apiClient.post("token/", { username, password });
      localStorage.setItem("TOKEN", response.data.access);
      localStorage.setItem("REFRESH_TOKEN", response.data.refresh);
    } catch (error) {
      console.error("Error fetching auth token", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setEmailError("Email already exists.");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.error || "");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/register/", { email, password });
      localStorage.setItem("USER", response.data.username);
      localStorage.setItem("ID", response.data.id);
      await getAuthToken(response.data.username, password);
      onSuccess();
    } catch (error: any) {
      setGeneralError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Box>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
        />
      </Box>
      <Box>
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
      </Box>
      {generalError && (
        <Typography color="error" variant="body2">
          {generalError}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
