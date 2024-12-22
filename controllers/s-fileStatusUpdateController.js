import { matchedData, validationResult } from "express-validator";
import { ValidationError, DatabaseError } from "../utils/errors.js";
import { UpdateFileStatus } from "../services/s-informationServices.js";

export const StartupFileStatusUpdateController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const data = matchedData(req);
      const filename = data.fileName;
      const type = data.type;
      const userId = req._id;
      await UpdateFileStatus(userId, filename, type);
      res.status(200).send({ msg: "File status updated successfully" });
    } catch (error) {
      next(new DatabaseError("Invalid Data", 500));
    }
  } else {
    next(new ValidationError());
  }
};
