import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");

  // Handle email/password registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/registration/",
        formData
      );
      console.log("Registration successful!", res.data);
      localStorage.setItem("access_token", res.data.access);
    } catch (error: any) {
      console.error("Registration failed", error.response?.data);
      setError("Registration failed. Please check your details.");
    }
  };

  // Handle Google authentication
  const handleGoogleRegister = async (response: any) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/social/google/",
        {
          access_token: response.credential,
        }
      );
      console.log("Google Registration successful!", res.data);
      localStorage.setItem("access_token", res.data.access);
    } catch (error) {
      console.error("Google Registration failed", error);
      setError("Google Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
        />
        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h3>Or register with Google</h3>
      <GoogleLogin
        onSuccess={handleGoogleRegister}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
}
