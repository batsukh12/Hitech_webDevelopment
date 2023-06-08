const Category = require('../models/category')
exports.createCat = async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (err) {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  };
  exports.getCat = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        res.status(200).json({
          success: false,
          message: "category not found",
        });
      }
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (err) {}
  };
  
  exports.getCats = async (req, res, next) => {
    try {
      const category = await Category.find();
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (err) {}
  };
  
  exports.updateCat = async (req, res, next) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (err) {}
  };
  
  exports.deleteCat= async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!user) {
        res.status(200).json({
          success: false,
          message: "category not found",
        });
      }
      await User.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        success: true,
      });
    } catch (err) {}
  };