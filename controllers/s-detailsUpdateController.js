import { ValidationError } from "../utils/errors.js";
import { updateStartupDetails } from "../services/s-informationServices.js";
import { matchedData, validationResult } from "express-validator";

export const startupDetailsUpdateController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const data = matchedData(req);
      const userId = req._id;
      
      await updateStartupDetails(userId, data);
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      next(error);
    }
  } else {
    next(new ValidationError("Invalid input data"));
  }
};
