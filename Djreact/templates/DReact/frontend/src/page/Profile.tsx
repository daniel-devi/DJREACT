import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/accounts/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  return user ? (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      {user.profile_picture && (
        <img src={user.profile_picture} alt="Profile" width={100} />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
