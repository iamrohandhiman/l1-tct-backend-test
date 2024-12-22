import { matchedData,validationResult } from "express-validator";
import { updateInvestorDetails } from "../services/i-informationServices.js";
import { ValidationError } from "../utils/errors.js";
export const InvestorDetailsUpdateController = async(req,res,next)=>{
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const userId = req._id;
      const data = matchedData(req);
      await updateInvestorDetails(userId, data);
      res.status(201).send({ "msg": "Data Updated successfully" });
    } catch (e) {
      next(e);
    }
  } else {
    next(new ValidationError());
    console.log(result)
  }
}