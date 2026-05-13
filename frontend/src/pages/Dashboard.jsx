import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  Layers3,
  Activity,
  Cpu,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import API from "../api/axios";

import UploadForm from "../components/UploadForm";
import ModelCard from "../components/ModelCard";
import ModelViewer from "../components/ModelViewer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, logout } =
    useContext(AuthContext);

  const [models, setModels] = useState([]);

  const [selectedModel, setSelectedModel] =
    useState(null);

  const fetchModels = async () => {
    try {
      const { data } = await API.get(
        "/models"
      );

      setModels(data.models);

      if (
        data.models.length > 0 &&
        !selectedModel
      ) {
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
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white">

      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[160px]"></div>

        <div className="absolute bottom-[-250px] left-[-100px] w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">

        {/* Navbar */}
        <Navbar
          user={user}
          logout={logout}
        />

        <div className="p-6">

          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* CARD */}
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-5 transition-all hover:border-blue-500/20">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-zinc-400 text-sm">
                    Total Models
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {models.length}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10">

                  <Layers3 className="text-blue-400" />
                </div>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-5 transition-all hover:border-blue-500/20">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-zinc-400 text-sm">
                    Workspace Status
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    Active
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">

                  <Activity className="text-emerald-400" />
                </div>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-5 transition-all hover:border-blue-500/20">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-zinc-400 text-sm">
                    Rendering Engine
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    WebGL
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/10">

                  <Cpu className="text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* MAIN LAYOUT */}
          <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6">

            {/* LEFT SIDEBAR */}
            <div className="space-y-6">

              {/* Upload Section */}
              <div className="rounded-2xl border border-white/5 bg-[#111111] p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">

                    <Sparkles className="text-blue-400" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      Upload Center
                    </h2>

                    <p className="text-sm text-zinc-400">
                      Add new 3D assets
                    </p>
                  </div>
                </div>

                <UploadForm
                  fetchModels={fetchModels}
                />
              </div>

              {/* Collection */}
              <div className="rounded-2xl border border-white/5 bg-[#111111] p-5">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <h2 className="text-2xl font-semibold">
                      Your Collection
                    </h2>

                    <p className="text-sm text-zinc-400 mt-1">
                      Stored 3D models
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-semibold">
                    {models.length}
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">

                  {models.map((model) => (
                    <ModelCard
                      key={model._id}
                      model={model}
                      setSelectedModel={
                        setSelectedModel
                      }
                        fetchModels={fetchModels}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT VIEWER */}
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">

              <ModelViewer
                model={selectedModel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;