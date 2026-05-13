import {
  Eye,
  Box,
  Trash2,
} from "lucide-react";

import API from "../api/axios";

const ModelCard = ({
  model,
  setSelectedModel,
  fetchModels,
}) => {

  // DELETE MODEL
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this model?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/models/${model._id}`
      );

      fetchModels();

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };



  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-4
      transition-all
      duration-300
      hover:border-cyan-400/40
      hover:bg-white/10
      hover:scale-[1.02]
    "
    >

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Box
              size={18}
              className="text-cyan-400"
            />
          </div>

          <div className="overflow-hidden">
            <h3 className="font-semibold text-lg truncate max-w-[180px]">
              {model.modelName}
            </h3>

            <p className="text-xs text-slate-400">
              3D GLB Model
            </p>
          </div>
        </div>



        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-3">

          {/* VIEW */}
          <button
            onClick={() =>
              setSelectedModel(model)
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              py-2.5
              font-medium
              bg-gradient-to-r
              from-cyan-500
              to-purple-500
              hover:opacity-90
              transition-all
            "
          >
            <Eye size={16} />
            View
          </button>



          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              py-2.5
              font-medium
              bg-red-500/20
              border border-red-500/30
              text-red-400
              hover:bg-red-500/30
              transition-all
            "
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default ModelCard;