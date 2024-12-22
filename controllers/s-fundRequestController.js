import { matchedData, validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js"; // Direct import of ValidationError
import { DatabaseError } from "../utils/errors.js"; // Direct import of DatabaseError
import { UpdateStartupFundingRequest } from "../services/s-informationServices.js";
import { logger } from "../config/logger.js";

export const StartupFundRequestController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const data = matchedData(req);
      const userId = req._id;
      await UpdateStartupFundingRequest(userId, data);
      res.status(201).json({ msg: "Request Updated Successfully" });
    } catch (error) {
      logger.error("Error updating funding request", error);
      next(new DatabaseError("Error updating funding request"));
    }
  } else {
    logger.error("Invalid data provided", result.errors);
    next(new ValidationError("Invalid data"));
  }
};
