const errorHandler = (err, req, res, next) => {
  console.log("ErrorStatus", err.status || 500);
  console.log("ErrorMessage", err.message);

  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message,
  });
};

module.exports = errorHandler;
