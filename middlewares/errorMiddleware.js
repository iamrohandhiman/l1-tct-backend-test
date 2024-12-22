import { logger } from "../config/logger.js";

const entryErrorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;
  
  switch (err.code) {
    case 11000:
      message = "Duplicate entry. Please use unique values.";
      statusCode = 409; 
      break;
    case 121:
      message = "Document validation failed. Please check your input.";
      statusCode = 400; 
      break;
    case 50:
      message = "Query exceeded the time limit. Try simplifying your query.";
      statusCode = 503; 
      break;
    case 16755:
      message = "Invalid field projection in the query.";
      statusCode = 400;
      break;
    case 2:
      message = "Invalid query value. Please check your parameters.";
      statusCode = 400; 
      break;
    case 13:
      message = "Unauthorized access. Please check your credentials.";
      statusCode = 401; 
      break;
    case 8:
      message = "Cursor not found or query timeout.";
      statusCode = 500; 
      break;
    case 96:
      message = "Invalid database or collection name.";
      statusCode = 400; 
      break;
    default:
      logger.error("Unhandled Error: ", err);
      break;
  }

  logger.error({
    message: message,
    code: err.code,
    statusCode: statusCode,
  });

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default entryErrorHandler;
