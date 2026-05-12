const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "model/gltf-binary",
      "application/octet-stream",
    ];

    const isGLB =
      file.originalname.toLowerCase().endsWith(".glb");

    if (allowedMimeTypes.includes(file.mimetype) || isGLB) {
      cb(null, true);
    } else {
      cb(new Error("Only .glb files are allowed"));
    }
  },
});

module.exports = upload;