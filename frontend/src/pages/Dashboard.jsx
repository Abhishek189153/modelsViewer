import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex justify-between items-center p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          3D Viewer Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <p>{user?.name}</p>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-10">
        <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Welcome to 3D Model Viewer
          </h2>

          <p className="text-slate-400 mt-3">
            Upload and interact with your 3D models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;