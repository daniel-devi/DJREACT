import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrength {
  score: number;
  message: string;
  color: string;
}

interface ErrorResponse {
  [key: string]: string[];
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const [generalError, setGeneralError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    message: "",
    color: "",
  });

  // === HANDLE INPUT ===
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") checkPasswordStrength(value);
  };

  // === PASSWORD STRENGTH ===
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = "";
    let color = "";

    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) [message, color] = ["Weak", "bg-red-500"];
    else if (score <= 3) [message, color] = ["Moderate", "bg-yellow-500"];
    else [message, color] = ["Strong", "bg-green-500"];

    setPasswordStrength({ score, message, color });
  };

  // === TANSTACK MUTATION ===
  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const submitData = new FormData();
      submitData.append("email", data.email);
      submitData.append("password1", data.password);
      submitData.append("password2", data.confirmPassword);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/registration/",
        submitData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token)
      navigate("/");
    },
    onError: (error: any) => {
      if (error.response?.data) {
        setErrors(error.response.data);
        if (
          !Object.keys(error.response.data).some((key) =>
            ["email", "password1", "password2"].includes(key)
          )
        ) {
          setGeneralError("Registration failed. Please check your details.");
        }
      } else {
        setGeneralError("Registration failed. Please try again.");
      }
    },
  });

  // === FORM SUBMIT ===
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setGeneralError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      setGeneralError("Email and password are required");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setGeneralError("Please enter a valid email address");
      return;
    }
    if (passwordStrength.score < 3) {
      setGeneralError("Please choose a stronger password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setGeneralError("Passwords do not match!");
      return;
    }

    registerMutation.mutate(formData);
  };

  // === GOOGLE REGISTER ===
  const handleGoogleRegister = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      setGeneralError("Google authentication failed: No credential received");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/social/google/",
        {
          access_token: credentialResponse.credential,
        }
      );
      localStorage.setItem("access_token", response.data.access);
      navigate("/profile");
    } catch (error: any) {
      setGeneralError("Google Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formData.password && (
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full ${passwordStrength.color} transition-all`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
          )}

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors?.password2 && (
            <p className="text-red-500 text-sm">{errors.password2[0]}</p>
          )}

          {generalError && (
            <p className="text-red-500 text-center text-sm">{generalError}</p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition"
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center">
          <GoogleLogin onSuccess={handleGoogleRegister} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
