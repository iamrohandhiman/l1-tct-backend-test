import { matchedData, validationResult } from "express-validator"
import { FetchInvestorBookmark } from "../services/i-informationServices.js";
import { ValidationError } from "../utils/errors.js";

export const InvestorBookmarkFetch= async (req, res, next) => {
  const result = validationResult(req);


  if (!result.isEmpty()) {
    return next(new ValidationError());
  }
  try {
    
    const userId = req._id; 
    const data = matchedData(req);
    const startupUserId = data.startupUserId;

    const investorBookmarks = await FetchInvestorBookmark(userId, startupUserId);
   
    res.status(200).json({
      investorBookmarks
    });
  } catch (error) {
  
    next(error); 
  }
};
