const subCategory = require('../models/subCategory')
exports.createSubCat = async (req, res, next) => {
    try {
      const subCat = await subCategory.create(req.body);
      res.status(200).json({
        success: true,
        data: subCat,
      });
    } catch (err) {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  };
  exports.getSubCat = async (req, res, next) => {
    try {
      const subCat = await subCategory.findById(req.params.id);
      if (!subCat) {
        res.status(200).json({
          success: false,
          message: "subCat not found",
        });
      }
      res.status(200).json({
        success: true,
        data: subCat,
      });
    } catch (err) {}
  };
  
  exports.getSubCats = async (req, res, next) => {
    try {
      const subCat = await subCategory.find();
      res.status(200).json({
        success: true,
        data: subCat,
      });
    } catch (err) {}
  };
  
  exports.updateSubCat = async (req, res, next) => {
    try {
      const subCat = await subCategory.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: subCat,
      });
    } catch (err) {}
  };
  
  exports.deleteSubCat= async (req, res, next) => {
    try {
      const subCat = await subCategory.findById(req.params.id);
      if (!subCat) {
        res.status(200).json({
          success: false,
          message: "subCat not found",
        });
      }
      await subCategory.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        success: true,
      });
    } catch (err) {}
  };