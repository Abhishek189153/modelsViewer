import { useState } from "react";

import {
  UploadCloud,
  Sparkles,
} from "lucide-react";

import API from "../api/axios";

const UploadForm = ({ fetchModels }) => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!file) {
      return alert(
        "Please select a .glb file"
      );
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("model", file);

      await API.post(
        "/models/upload",
        formData
      );

      fetchModels();

      setFile(null);

      alert("Model uploaded successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      {/* Upload Area */}
      <label
        className="
        flex
        flex-col
        items-center
        justify-center
        border-2
        border-dashed
        border-white/10
        rounded-2xl
        p-8
        cursor-pointer
        hover:border-cyan-400/40
        hover:bg-cyan-500/5
        transition-all
      "
      >
        <UploadCloud
          size={42}
          className="text-cyan-400 mb-4"
        />

        <p className="font-medium text-lg">
          Upload GLB File
        </p>

        <p className="text-sm text-slate-400 mt-1">
          Drag & drop or browse
        </p>

        {file && (
          <div className="mt-4 text-sm text-cyan-300">
            {file.name}
          </div>
        )}

        <input
          type="file"
          accept=".glb"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          py-3
          font-semibold
          bg-gradient-to-r
          from-cyan-500
          to-purple-500
          hover:opacity-90
          transition-all
          disabled:opacity-50
        "
      >
        <Sparkles size={18} />

        {loading
          ? "Uploading..."
          : "Upload Model"}
      </button>
    </div>
  );
};

export default UploadForm;