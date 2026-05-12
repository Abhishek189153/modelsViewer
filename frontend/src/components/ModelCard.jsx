const ModelCard = ({ model, setSelectedModel }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
      <h3 className="font-semibold truncate">
        {model.modelName}
      </h3>

      <button
        onClick={() => setSelectedModel(model)}
        className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
      >
        View Model
      </button>
    </div>
  );
};

export default ModelCard;