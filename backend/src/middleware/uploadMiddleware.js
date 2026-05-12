const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "model/gltf-binary") {
      cb(null, true);
    } else {
      cb(new Error("Only .glb files are allowed"));
    }
  },
});

module.exports = upload;