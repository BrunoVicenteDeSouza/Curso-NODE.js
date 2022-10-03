const AppError = require("./AppError");

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "erro",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "erro",
    message: "Internal server error",
  });
};
