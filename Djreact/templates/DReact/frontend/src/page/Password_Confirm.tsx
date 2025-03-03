import { useState } from "react";
import { useParams } from "react-router-dom";

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams(); // Get UID and token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `/api/auth/password_reset/confirm/${uidb64}/${token}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password: password }),
      }
    );

    if (response.ok) {
      setMessage("Password has been reset successfully!");
    } else {
      setMessage("Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Enter New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
