import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Default login with email/password
  const handleDefaultLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      console.log("Login successful!", res.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Google authentication
  const handleGoogleLogin = async (response: any) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/social/google/",
        {
          access_token: response.credential,
        }
      );
      localStorage.setItem("access_token", res.data.access);
      console.log("Google login successful!", res.data);
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleDefaultLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <h3>Or login with Google</h3>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}
