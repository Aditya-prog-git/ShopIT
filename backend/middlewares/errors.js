import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error"
  };

  //Handle Inavlid Mongoose ID Error
  if(err?.name === "CastError") {
    error.message = `Resource not found. InvalidID: ${err?.path}`;
    error = new ErrorHandler(error.message, 400);
  }

  //Handle Validation Error
  if(err?.name === "ValidationError") {
    const message = Object.values(err?.errors).map(value => value.message);
    error = new ErrorHandler(message, 400);
  }

  //Handle Mongoose Duplicate Key Error
  if(err?.code === 11000) {
    error.message = `Duplicate ${Object.keys(err?.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  //Handle Wrong JWT Error
  if(err?.name === "JsonWebTokenError") {
    error.message = `JSON Web Token is invalid, Try Again!!!`;
    error = new ErrorHandler(error.message, 400);
  }

  //Handling Expired JWT Error
  if(err?.name === "TokenExpiredError") {
    error.message = `JSON Web Token is expired, Try Again!!!`;
    error = new ErrorHandler(error.message, 400);
  }

  if(process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack
    })
  }

  if(process.env.NODE_ENV === "production") {
    res.status(error.statusCode).json({
      message: error.message,
    })
  }

  // res.status(error.statusCode).json({
  //   message: error.message,
  //   error: err,
  //   Stack: err?.stack
  // })
}