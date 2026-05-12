const Model = require("../models/Model");
const s3 = require("../config/s3");



exports.uploadModel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.file;

    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,

      Key: `models/${Date.now()}-${file.originalname}`,

      Body: file.buffer,

      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    
    const model = await Model.create({
      userId: req.user.id,
      modelName: file.originalname,
      modelUrl: uploadResult.Location,
    });

    res.status(201).json({
      success: true,
      message: "Model uploaded successfully",
      model,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getModels = async (req, res) => {
  try {
    const models = await Model.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      models,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.saveCameraState = async (req, res) => {
  try {
    const { cameraState } = req.body;

    const model = await Model.findById(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found",
      });
    }

    model.cameraState = cameraState;

    await model.save();

    res.status(200).json({
      success: true,
      message: "Camera state saved",
      model,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};