import express from "express";
import startupDetailsValidation from "../schema/s-detailsValidation.js";
import { StartupFinance } from "../model/StartupFinance.js";
import { StartupDetails } from "../model/StartupDetails.js";
import { StartupAuthentication } from "../middlewares/s-authentication.js";
import { hasfilledDocuments } from "../middlewares/s-stageCheck.js";

const router = express.Router();



router.post(
  "/api/v1/startup/financial/info/upload",
  StartupAuthentication,
  hasfilledDocuments,
  //need to add a validator
  //temp controler
 async(req,res,next)=>{
   const userId = req._id
   await StartupDetails.updateOne({userId:userId},
    {$set:{hasfilledFinancialDetails:true}}
   )
   res.send("financial data updated")
   
 })

export default router;
