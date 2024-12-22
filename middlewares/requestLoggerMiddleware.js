import { logger } from "../config/logger.js";

export const RequestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url} ip-> ${req.ip}`);  
  next();
};
