import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
import checkAuth from "@/utils/CheckAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("ref") || "/profile";

  const UserDetail = async (): Promise<any | null> => {
    if (!checkAuth()) return null;

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/accounts/profile/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const UserData = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
      };
      localStorage.setItem("UserData", JSON.stringify(UserData));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
      throw error;
    }
  };

  // Mutation for default login
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      return res.data;
    },
    onSuccess: () => {
      navigate(redirectTo);
      UserDetail();
    },
    onError: (error) => console.error("Login failed", error),
  });

  // Mutation for Google login
  const googleLoginMutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/social/google/",
        { access_token: accessToken }
      );
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      return res.data;
    },
    onSuccess: () => {
      navigate(redirectTo);
      UserDetail();
    },
    onError: (error) => console.error("Google login failed", error),
  });

  // Handlers
  const handleDefaultLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const handleGoogleLogin = (response: any) => {
    googleLoginMutation.mutate(response.credential);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-black">Login</h2>

        <form onSubmit={handleDefaultLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-300"></div>
          <span className="bg-white px-4 text-gray-500">OR</span>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google login failed")}
          />
        </div>

        {(loginMutation.isError || googleLoginMutation.isError) && (
          <p className="text-red-500 text-center">
            Login failed. Please check your credentials.
          </p>
        )}

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
