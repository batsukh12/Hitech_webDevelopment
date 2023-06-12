const Photo = require('../models/photos')
exports.createPhotos = async (req, res, next) => {
    try {
      const photo = await Photo.create(req.body);
      res.status(200).json({
        success: true,
        data: photo,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  };
  exports.getPhoto = async (req, res, next) => {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo) {
        res.status(200).json({
          success: false,
          message: "photo not found",
        });
      }
      res.status(200).json({
        success: true,
        data: photo,
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.getPhotos = async (req, res, next) => {
    try {
      const photo = await Photo.find();
      res.status(200).json({
        success: true,
        data: photo,
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updatePhoto = async (req, res, next) => {
    try {
      const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: photo,
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.deletePhoto= async (req, res, next) => {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo) {
        res.status(200).json({
          success: false,
          message: "photo not found",
        });
      }
      await Photo.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };