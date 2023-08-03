const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.register = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password дор хаяж 8 урттай байна.",
      });
    }
    // password tom jijig tusgai temdegt asuulsig shakgana.
    if (!validatePasswordStrength(password)) {
      return res.status(400).json({
        success: false,
        message: "Password том жижиг тусгай тэмдэгт агуулна.",
      });
    }
    //email format checker
    if (!validateEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate the phone number format
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({
        success: false,
        message: "утасны дугаар буруу байна.",
      });
    }
    // email phone burgtgegdej bsn esehiig shalgana.
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "email бүртгэгдсэн байна.",
      });
    }
    const saltRounds = 10;
    let hashedPassword = "";
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("salt:", salt);
    hashedPassword = await bcrypt.hash(req.body.password, salt);

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
      res.status(400).json({
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
  } catch (err) {
    console.log(err);
  }
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

    const user = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(200).json({
            success: false,
            message: "User not found",
          });
        }

        const userId = user._id;
        if (result) {
          const token = jwt.sign({ userId }, "verySecretValue", {
            expiresIn: "0.5h",
            algorithm: "HS256",
          });
          res.status(200).json({
            success: true,
            message: "login successfully",
            data: user,
            token: token,
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate a random 5-digit OTP
    const otp = generateOTP();

    // Calculate the expiration time (2 minutes from now)
    const otpExpiration = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes in milliseconds

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user with the new OTP and OTP expiration
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      // Configure your email provider settings here
      // Example configuration for Gmail:
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-password",
      },
    });

    // Configure the email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if OTP is expired
    if (user.otpExpiration < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Compare the provided OTP with the stored OTP
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash the new password
    const saltRounds = 10;
    let hashedPassword = "";
    const salt = await bcrypt.genSalt(saltRounds);

    hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    // Return success response
    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to generate a random 5-digit OTP
function generateOTP() {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  return otp;
}
// Helper function to validate email format
function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Helper function to validate password strength
function validatePasswordStrength(password) {
  const specialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const capitalLetterRegex = /[A-Z]/;
  return specialSymbolRegex.test(password) && capitalLetterRegex.test(password);
}
// Helper function to validate phone number format
function validatePhoneNumber(phone) {
  const phoneNumberRegex = /^[1-9]\d{7}$/;
  return phoneNumberRegex.test(phone);
}
