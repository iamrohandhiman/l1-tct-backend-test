import {validationResult,matchedData} from "express-validator"
import { ValidationError } from "../utils/errors.js"
import { updateAcceptOffer } from "../services/offersServices.js"
export const acceptOfferController = async(req,res,next)=>{
  const result = validationResult(req)
  if(result.isEmpty()){
     try{
      const userId = req._id
      const {offerId} = matchedData(req)
      await updateAcceptOffer(userId,offerId)
      res.status(201).json({msg:"offer created successfully"})
     }
     catch(e){
       next(e) 
     }
  }
  else{
    next(new ValidationError())
  }
}