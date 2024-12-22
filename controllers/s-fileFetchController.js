import { matchedData, validationResult } from "express-validator";
import { StartupDetails } from "../model/StartupDetails.js";
import { getObjectURL, getS3Key } from "../services/aws-s3Services.js";
import { ValidationError } from "../utils/errors.js"; 

export const StartupFileFetchController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      const data = matchedData(req);
      const filename = data.fileName;
      const type = data.type;
      const key = await getS3Key(id, filename, type);
      const url = await getObjectURL(key);
      res.status(200).json({ success: true, uploadUrl: url });
    } catch (error) {
      next(error);
    }
  } else {
    next(new ValidationError("Invalid data provided", 400));
  }
};
