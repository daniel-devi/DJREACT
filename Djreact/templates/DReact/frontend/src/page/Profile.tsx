import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchProfile = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/accounts/profile/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return res.data;
};

export default function Profile() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: 1,
  });

  // Helper to get initials if profile picture is not available
  const getInitials = () => {
    if (user?.first_name || user?.last_name) {
      return `${user.first_name?.charAt(0) || ""}${
        user.last_name?.charAt(0) || ""
      }`.toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    } else {
      return "U"; 
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("UserData");
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen bg-gray text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h2 className="text-2xl font-bold">Your Profile</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              <div className="h-24 w-24 mx-auto bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/3 mx-auto"></div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center space-y-2">
              <p className="text-red-400">
                Failed to load profile. Please try again.
              </p>
              <button
                onClick={refetch}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Success State */}
          {user && (
            <>
              <div className="flex justify-center">
                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold border-4 border-white">
                    {getInitials()}
                  </div>
                )}
              </div>

              <div className="text-center">
                {user.username ? (
                  <p className="text-xl text-gray-400">Username: {user.username}</p>
                ) : (
                  <p>No Username</p>
                )}
                <h3 className="text-xl font-bold">
                  {user.first_name || user.last_name
                    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                    : "No Name"}
                </h3>
                <p className="text-gray-400">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center mt-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Joined</p>
                  <p>{new Date(user.date_joined).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Last login</p>
                  <p>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition">
                  Edit Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
