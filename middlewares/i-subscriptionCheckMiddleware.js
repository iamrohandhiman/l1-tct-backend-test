
import { FetchInvestorSubscription, UpdateInvestorSubscription } from "../services/i-informationServices.js";
import {matchedData} from "express-validator"
export const InvestorSubscriptionActiveSubCheck = async (req, res, next) => {
  try {
    const data = matchedData(req);
    const type = req.type;
    if (type === "startup") {
      return next(); 
    }
  
    const userId = req._id;

    const subscription = await FetchInvestorSubscription(userId);
    const { isActive, subscriptionEnd } = subscription.subscriptionDetails;
  
  
    if (subscriptionEnd && subscriptionEnd < Date.now()) {
      await UpdateInvestorSubscription(userId, "starter", false, null, null);
      return res.status(409).json({ message: "subscribe to access this" });
    }
  
    if (!isActive) {
      return res.status(409).json({ message: "subscribe to access this" });
    }
  
    next();
  } catch (error) {
    console.error("Error in InvestorSubscriptionActiveSubCheck:", error.message);
    next(error);
  }
  
};
