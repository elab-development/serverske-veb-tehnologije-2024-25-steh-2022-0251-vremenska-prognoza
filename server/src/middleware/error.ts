import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utils/errorResponse";

// err: any, req: Request, res: Response, next: NextFunction
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.response) {
    switch (err.response.status) {
      case 404:
        error = new ErrorResponse("Resource not found", 404);
        break;
      case 401:
        error = new ErrorResponse("Unauthorized access", 401);
        break;
      case 500:
        error = new ErrorResponse("Internal server error", 500);
        break;
      default:
        error = new ErrorResponse(err.message, err.response.status);
        break;
    }
  } else {
    switch (err.status) {
      case 404:
        error = new ErrorResponse("Not Found", 404);
        break;
      case 401:
        error = new ErrorResponse("Unauthorized", 401);
        break;
      case 500:
        error = new ErrorResponse("Server Error", 500);
        break;
      default:
        error = new ErrorResponse(
          err.message || "Server Error",
          err.status || 500
        );
        break;
    }
  }

  res.status(error.statusCode || 500).send({
    error: error.message || "Server Error",
  });
};

export default errorHandler;
