import { matchedData, validationResult } from "express-validator"
import { addInvestorBookmark } from "../services/i-informationServices.js";
import { ValidationError } from "../utils/errors.js";

export const InvestorBookmarkUpdate = async (req, res, next) => {
  const result = validationResult(req);


  if (!result.isEmpty()) {
    return next(new ValidationError());
  }
  try {
    
    const userId = req._id; 
    const data = matchedData(req);
    const startupUserId = data.startupUserId;

    const updatedInvestor = await addInvestorBookmark(userId, startupUserId);

    res.status(200).json({
      msg: "Bookmark added successfully",
    });
  } catch (error) {
  
    next(error); 
  }
};
