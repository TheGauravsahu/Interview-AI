import logger from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  logger.error("Server Error", err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }
  return res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "dev" && { stack: err.stack }),
  });
};
