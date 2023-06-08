<<<<<<< Updated upstream
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    let hashedPassword = "";
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("salt:", salt);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("hashedPassword:", hashedPassword);

    req.body.password = hashedPassword;
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
    });
  } catch (err) {}
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ $or: [{ email: username }, { phone: username }] });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(200).json({
            success: false,
            message: "User not found",
          });
        }
        if (result) {
          const token = jwt.sign({ name: username }, 'verySecretValue', { expiresIn: '1h' });
          console.log(token);
          res.status(200).json({
            success: true, 
            message: "login successfully",
            token: token
          });
        } else {
          res.status(200).json({
            success: false,
            message: "username or password is wrong",
          });
        }
      });
    } else {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

=======
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    let hashedPassword = "";
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("salt:", salt);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("hashedPassword:", hashedPassword);

    req.body.password = hashedPassword;
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {}
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
    });
  } catch (err) {}
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ $or: [{ email: username }, { phone: username }] });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(200).json({
            success: false,
            message: "User not found",
          });
        }
        if (result) {
          const token = jwt.sign({ name: username }, 'verySecretValue', { expiresIn: '1h' });
          console.log(token);
          res.status(200).json({
            success: true, 
            message: "login successfully",
            token: token
          });
        } else {
          res.status(200).json({
            success: false,
            message: "username or password is wrong",
          });
        }
      });
    } else {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    next(err);

    
  }
};

>>>>>>> Stashed changes
