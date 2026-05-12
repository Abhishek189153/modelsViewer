const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    modelName: {
      type: String,
      required: true,
    },

    modelUrl: {
      type: String,
      required: true,
    },

    cameraState: {
      position: {
        x: Number,
        y: Number,
        z: Number,
      },

      target: {
        x: Number,
        y: Number,
        z: Number,
      },

      zoom: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Model", modelSchema);