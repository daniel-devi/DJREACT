import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "@/utils/apiClient";
import { TextField, Button, Typography, Box } from "@mui/material";
import StatusChip from "@/components/StatusChip";

interface LoginResponse {
    access: string;
    refresh: string;
}

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [status, setStatus] = useState<{
        type: "success" | "error" | "";
        message: string;
    }>({
        type: "",
        message: "",
    });
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const getUserDetail = async () => {
        try {
            const response = await apiClient.get(`auth/user?email=${email}`);
            localStorage.setItem("USER", response.data[0].username);
            localStorage.setItem("ID", response.data[0].id);
        } catch (err) {
            console.error("Failed to fetch user details", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        try {
            const response = await axios.post<LoginResponse>(
                "http://127.0.0.1:8000/api/auth/login",
                { email, password }
            );

            localStorage.setItem("TOKEN", response.data.access);
            localStorage.setItem("REFRESH_TOKEN", response.data.refresh);
            setError("");
            setStatus({ type: "success", message: "Login successful!" });

            await getUserDetail();
            navigate("/");
        } catch (err: any) {
            setStatus({ type: "error", message: "Login failed. Check your credentials." });
            setError("Invalid email or password.");
        }
    };

    return (
        <Box className="flex justify-center items-center min-h-screen bg-gray-50">
            <Box className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                {status.message && (
                    <StatusChip type={status.type} message={status.message} />
                )}
                <Typography
                    variant="h5"
                    component="h1"
                    className="text-center mb-4 font-semibold text-gray-800"
                >
                    Login
                </Typography>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-2"
                    >
                        Login
                    </Button>
                    <Button
                        variant="text"
                        color="secondary"
                        fullWidth
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </Button>
                </form>
                <Typography variant="body2" className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
