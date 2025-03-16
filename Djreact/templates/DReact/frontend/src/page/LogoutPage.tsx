import React from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("UserDetail");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-semibold mb-6">
        Are you sure you want to logout?
      </h1>
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
