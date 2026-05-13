const express = require("express");

const {
  uploadModel,
  getModels,
  saveCameraState,
  deleteModel,
} = require("../controllers/modelController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload",protect,upload.single("model"),uploadModel);

router.get("/", protect, getModels);

router.put("/:id/camera", protect, saveCameraState);

router.delete("/:id",protect,deleteModel);

module.exports = router;