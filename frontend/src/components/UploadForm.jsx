import { useState } from "react";

import API from "../api/axios";

const UploadForm = ({ fetchModels }) => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a .glb file");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("model", file);

      await API.post("/models/upload", formData);

      alert("Model uploaded successfully");

      fetchModels();

      setFile(null);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <h2 className="text-xl font-semibold mb-4">
        Upload 3D Model
      </h2>

      <input
        type="file"
        accept=".glb"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;