import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import API from "../api/axios";

import UploadForm from "../components/UploadForm";

import ModelCard from "../components/ModelCard";

import ModelViewer from "../components/ModelViewer";


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [models, setModels] = useState([]);

  const [selectedModel, setSelectedModel] = useState(null);

  // fetch models
  const fetchModels = async () => {
    try {
      const { data } = await API.get("/models");

      setModels(data.models);

      if (data.models.length > 0 && !selectedModel) {
        setSelectedModel(data.models[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* HEADER */}
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

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">

        {/* LEFT SIDEBAR */}
        <div className="space-y-5">

          <UploadForm fetchModels={fetchModels} />

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">
              Your Models
            </h2>

            <div className="space-y-3">
              {models.map((model) => (
                <ModelCard
                  key={model._id}
                  model={model}
                  setSelectedModel={setSelectedModel}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3D VIEWER */}
        <div className="lg:col-span-3">
          <ModelViewer model={selectedModel} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;