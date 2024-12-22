import { matchedData,validationResult } from "express-validator";
import { FetchInvestorDetails } from "../services/i-informationServices.js";
import { ValidationError } from "../utils/errors.js";
export const InvestorDetailsFetchController = async(req,res,next)=>{
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const userId = req._id;
      const data = matchedData(req);
      const User = await FetchInvestorDetails(userId);
      res.status(201).send(User);
    } catch (e) {
      next(e);
    }
  } else {
    next(new ValidationError());
  }
}