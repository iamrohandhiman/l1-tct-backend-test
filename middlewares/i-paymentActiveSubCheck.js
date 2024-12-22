


import { FetchInvestorSubscription, UpdateInvestorSubscription } from "../services/i-informationServices.js";

export const PaymentActiveSubCheck = async (req, res, next) => {
  try {
    
    const userId = req.body.userId; 
    console.log(userId)
    const subscription = await FetchInvestorSubscription(userId);
    
    const { isActive, subscriptionEnd } = subscription.subscriptionDetails;
    
    if (subscriptionEnd && subscriptionEnd < Date.now()) {
      await UpdateInvestorSubscription(userId, "starter", false, null, null);
     
      return next();
    }

    
    if (!isActive) {
      return next(); 
    }
   
   
    return res.status(400).json({ message: "Subscription is already active." });
  } catch (error) {
    console.error("Error in PaymentActiveSubCheck:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

