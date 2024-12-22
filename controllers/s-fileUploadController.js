import { matchedData, validationResult } from "express-validator";
import { logger } from "../config/logger.js";
import { ValidationError, ServiceUnavailableError } from "../utils/errors.js"; 
import { putObjectURL } from "../services/aws-s3Services.js";
import { updateFileKey } from "../services/s-informationServices.js";
export const StartupFileUploadController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const userId = req._id;
      const data = matchedData(req);
      const fileName = data.fileName;
      const type = data.type;
      let contentType = "application/pdf";
      let key = `startups/${userId}/startupDocs/basicDocs/${fileName}`;
      
      if (type === "logo") {
        key = `startups/${userId}/logo/${fileName}`;
        contentType = "image/png";
      }

      if (type === "fundingDocument") {
        key = `startups/${userId}/startupDocs/fundingDocs/${fileName}`;
      }

      const url = await putObjectURL(fileName, contentType, key);
      if (!url) {
        logger.error("Error generating S3 URL", { fileName, userId });
        return next(new ServiceUnavailableError());
      }

      await updateFileKey(userId, fileName, key, type);
      res.status(200).json({ success: true, uploadUrl: url });
    } catch (error) {
      logger.error("Unexpected error during file upload", { error });
      next( error);
    }
  } else {
    next(new ValidationError());
  }
};
